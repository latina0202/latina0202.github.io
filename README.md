# latina0202.github.io

Personal portfolio of Ngoc Duong (Huynh Ngoc Duong).

**Live site:** https://latina0202.github.io

## Update the resume

Every Resume link on the site (top button, phone menu, Contact) opens the
Resume page (`resume.html`), which shows `Ngoc_Duong_Huynh_Resume.pdf` from this
repo inside the site, with Download and Full screen buttons.

**Same file name (most updates):**

1. Export the resume from Google Docs: File > Download > PDF.
2. Rename the file to `Ngoc_Duong_Huynh_Resume.pdf`.
3. On GitHub, open this repo, click **Add file > Upload files**, drop the PDF in,
   and click **Commit changes**. It replaces the old one.

The Resume page shows the new file within a few minutes. No code changes needed.

**Different file name:** upload the PDF, then change the one line
`const RESUME_FILE = '...'` in `script.js` to the new name.

## What's on the site

- **Hero** - intro, three photos
- **Experience** - journey timeline (AIESEC, Home Credit, Sea Group) and each role in detail
- **Career Inspiration** - data science for healthcare, and the questions behind it
- **Projects** - Spotify genre classification, MoMo cash loan, AIESEC video, NAVI
- **Education** - UEH, tools, awards
- **Beyond work** - guitar, trekking, volunteering
- **Contact** - email, LinkedIn, GitHub, resume

Plain HTML, CSS and JavaScript (`index.html`, `style.css`, `script.js`). No build step.
