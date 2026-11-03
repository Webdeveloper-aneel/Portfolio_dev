# Aneel Khan — Premium Developer Portfolio Website

A modern, responsive, and performance-optimized personal developer portfolio website built for **Aneel Khan**. Designed with a bespoke **Warm Beige + Forest Green** theme, clean typography, accessible structure, and zero backend or database requirements.

---

## 📁 Project Structure

```text
Portfolio_dev/
├── index.html                   # Main single-page HTML5 structure
├── assets/
│   ├── css/
│   │   └── style.css            # Custom CSS styling (Warm Beige & Forest Green theme)
│   ├── js/
│   │   └── script.js            # Interactive logic (filters, Gmail Compose workflow)
│   ├── images/
│   │   ├── profile-portrait.jpg      # Developer profile photograph
│   │   ├── project-vision-church.jpg # Voice of Vision Church preview
│   │   ├── project-urdu-hindi-church.jpg # Urdu Hindi Church preview
│   │   └── project-bridges.jpg       # Bridges_Info portal preview
│   ├── icons/
│   │   └── favicon.svg          # Custom "AK." favicon icon
│   └── documents/
│       └── ANEEL_KHAN_CV.pdf    # Downloadable resume file
└── README.md                    # Documentation guide
```

---

## 🚀 How to Run the Website in VS Code

1. **Open Folder in VS Code**:
   - Launch VS Code.
   - Go to **File** → **Open Folder...** and select `c:\Users\Hp\Desktop\Aneel_Main\Portfolio`.

2. **Run with Live Server (Recommended)**:
   - Install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab (`Ctrl+Shift+X`).
   - Right-click `index.html` in the file explorer and select **"Open with Live Server"**.
   - Your default browser will launch at `http://127.0.0.1:5500/index.html`.

3. **Or Run Directly in Any Web Browser**:
   - Double-click `index.html` directly from your file explorer to open it in Chrome, Edge, Firefox, or Safari.
   - Because this project uses vanilla HTML5, CSS3, and JavaScript, it runs completely standalone without requiring Node.js, PHP, or local server runtimes.

---

## ✏️ Information to Customize With Your Real Details

All placeholders in `index.html` and `js/script.js` are clearly indicated with editable markers:

| Section | Location | What to Update |
| :--- | :--- | :--- |
| **Contact Email** | `index.html` & `js/script.js` | Replace `aneel.dev@example.com` with your real email address. |
| **Phone / WhatsApp** | `index.html` (`#contact`) | Replace `+92 (Placeholder)` and the `tel:` / `wa.me/` links with your actual number. |
| **Social Links** | `index.html` (`#contact` & `footer`) | Update your GitHub (`github.com/aneelkhan-dev`) and LinkedIn (`linkedin.com/in/aneelkhan`) URLs. |
| **Experience Company** | `index.html` (`#experience`) | Replace `[Company / Organization Name — Editable]` with the company where you did your WordPress internship. |
| **Education Details** | `index.html` (`#education`) | Update your qualification name (e.g. BS Computer Science), university/institute name, and completion year. |

---

## 📷 Profile Photo & CV Documentation

### 1. Profile Photo
- Profile photo is located at `assets/images/profile-portrait.jpg`.
- In `index.html`:
  ```html
  <img src="assets/images/profile-portrait.jpg" alt="Aneel Khan — Web Developer &amp; Designer Portrait" class="hero-portrait-img" id="heroProfileImage" loading="eager">
  ```

### 2. Updating Your CV / Resume (PDF)
- The CV is located at `assets/documents/ANEEL_KHAN_CV.pdf`.
- When updating, replace the file at `assets/documents/ANEEL_KHAN_CV.pdf`.
- All resume download buttons across the navbar, About section, and footer link directly to this document.

---

## 🌐 How to Publish the Portfolio Online for Free

Because this website is a pure static frontend, you can deploy it in minutes for free using any of these top platforms:

### Option A: GitHub Pages (Easiest)
1. Initialize a Git repository in your portfolio folder:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```
2. Create a new repository on GitHub (e.g., `portfolio` or `<your-username>.github.io`).
3. Push your repository:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, navigate to **Settings** → **Pages** → under **Build and deployment**, set source to `main` branch `/ (root)` and click **Save**.
5. Your portfolio will go live at `https://<your-username>.github.io/<repo-name>/`.

### Option B: Netlify
1. Go to [netlify.com](https://www.netlify.com/) and sign up or log in.
2. Drag and drop the `Portfolio` folder directly into the Netlify dashboard.
3. Your site will instantly be deployed with an active SSL certificate.

### Option C: Vercel
1. Go to [vercel.com](https://vercel.com/) and log in.
2. Import your GitHub repository or install the Vercel CLI.
3. Click **Deploy**.
