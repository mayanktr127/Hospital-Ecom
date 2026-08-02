const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Dedicated doc-files directory (prevents App Router route collisions)
const docFilesDir = path.join(__dirname, "public", "doc-files");
if (!fs.existsSync(docFilesDir)) {
  fs.mkdirSync(docFilesDir, { recursive: true });
}

// Ensure sample_doc.pdf exists
const samplePdfPath = path.join(docFilesDir, "sample_doc.pdf");
if (!fs.existsSync(samplePdfPath)) {
  const minimalPdfHeader = Buffer.from(
    "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] >>\nendobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \ntrailer\n<< /Size 4 /Root 1 0 R >>\nstartxref\n185\n%%EOF"
  );
  fs.writeFileSync(samplePdfPath, minimalPdfHeader);
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, docFilesDir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/[^a-zA-Z0-9_.-]/g, "_");
    cb(null, `${Date.now()}_${cleanName}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|zip|exe|apk|xml|json|txt/;
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("File type not permitted for clinical upload."));
    }
  },
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "online",
    server: "Löwenstein Medical Express + Multer File Server",
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/downloads/file/:filename", (req, res) => {
  try {
    const rawFilename = req.params.filename;
    const safeFilename = path.basename(rawFilename);
    let filePath = path.join(docFilesDir, safeFilename);

    if (!fs.existsSync(filePath)) {
      filePath = samplePdfPath;
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}"`);

    const fileStream = fs.createReadStream(filePath);
    fileStream.on("error", (err) => {
      console.error("Stream Error:", err);
      res.status(500).json({ error: "Failed to read download stream" });
    });
    fileStream.pipe(res);
  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const fileMeta = {
      message: "File uploaded successfully via Multer.",
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: `${(req.file.size / (1024 * 1024)).toFixed(2)} MB`,
      mimeType: req.file.mimetype,
      downloadUrl: `/doc-files/${req.file.filename}`,
      uploadedAt: new Date().toISOString(),
    };

    console.log("Multer Upload Success:", fileMeta);
    res.status(200).json(fileMeta);
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error during upload" });
  }
});

app.listen(PORT, () => {
  console.log(`Löwenstein Multer Express Server running at http://localhost:${PORT}`);
});
