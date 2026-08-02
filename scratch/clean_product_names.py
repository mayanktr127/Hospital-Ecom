import re

def clean_title(text):
    if not isinstance(text, str):
        return text
    if "-" not in text:
        return text
    # If the text has hyphenated single letters like -P-r-i-s-m-a-
    if re.search(r'-[A-Za-z0-9]-', text):
        # Simply remove all hyphens
        res = text.replace("-", "")
        # Remove any non-breaking spaces or weird dash unicode characters
        res = re.sub(r'[\u2013\u2014\u201c\u201d]', ' ', res)
        # Collapse multiple spaces into a single space
        res = re.sub(r'\s+', ' ', res).strip()
        return res
    return text

test_cases = [
    "-P-r-i-s-m-a- -2-0-A-",
    "-P-o-l-y-g-r-a-p-h-y- -D-e-v-i-c-e-s- -–- -S-a-m-o-a-",
    "-P-o-l-y-g-r-a-p-h-y- -D-e-v-i-c-e-s- --- -S-a-m-o-a-",
    "-P-o-l-y-s-o-m-n-o-g-r-a-p-h-y- -D-e-v-i-c-e-s- ---- -S-o-n-a-t-a-",
    "-P-r-i-s-m-a- -S-m-a-r-t- -P-l-u-s-",
    "-P-r-i-s-m-a- -2-5-S- -S-T-",
    "-C-A-R-O- -1-0-0-",
    "-e-l-i-s-a- -8-0-0-"
]

for t in test_cases:
    print(f"{t}  ===>  '{clean_title(t)}'")
