const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
dns.setDefaultResultOrder("ipv4first");

const MONGODB_URI = "mongodb+srv://vaderharsh127_db_user:aRGaTdGcM0ml3NhJ@cluster0.qmqgldx.mongodb.net/pulmocare?retryWrites=true&w=majority&appName=Cluster0";

const MediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true, unique: true, index: true },
    contentType: { type: String, required: true, default: "application/octet-stream" },
    data: { type: Buffer, required: true },
    size: { type: Number, required: true },
  },
  { timestamps: true }
);

const Media = mongoose.models.Media || mongoose.model("Media", MediaSchema);

async function syncAllUploads() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB Atlas!");

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    console.log("No public/uploads directory found.");
    process.exit(0);
  }

  const files = fs.readdirSync(uploadsDir);
  console.log(`Found ${files.length} files in public/uploads to sync...`);

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    const stats = fs.statSync(filePath);
    if (!stats.isFile()) continue;

    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(file).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".png") contentType = "image/png";
    else if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".webp") contentType = "image/webp";
    else if (ext === ".pdf") contentType = "application/pdf";

    await Media.findOneAndUpdate(
      { filename: file },
      {
        $set: {
          filename: file,
          contentType,
          data: buffer,
          size: buffer.length,
        },
      },
      { upsert: true, new: true }
    );
    console.log(`Synced: ${file} (${buffer.length} bytes)`);
  }

  console.log("All uploads successfully synced to MongoDB Atlas Media collection!");
  process.exit(0);
}

syncAllUploads().catch((err) => {
  console.error("Sync error:", err);
  process.exit(1);
});
