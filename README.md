# 🌐 QS Academic Voter Self-Nomination Portal (Universitas Brawijaya)

A standalone, public, and 100% free web application for international and domestic academic peers to self-register as **Academic Reputation (AR) Voters** for the **QS World University Rankings** on behalf of **Universitas Brawijaya**.

---

## 🌟 Key Features

1. **English-First Academic Interface**:
   - Designed specifically for global academics and research partners.
   - Elegant Universitas Brawijaya identity: *Biru Brawijaya* (`#002D62`) and *Surya Majapahit Gold* (`#E5A823`).

2. **QS Integrity & Anti-Cheating Validation**:
   - **Public Email Blocker**: Strictly prevents submission using personal domains (`@gmail.com`, `@yahoo.com`, `@hotmail.com`, etc.) as mandated by QS rules.
   - **Self-Affiliation Blocker**: Detects and restricts `@ub.ac.id` domains to maintain strict QS compliance (UB civitas are prohibited from acting as UB academic voters).

3. **5 QS Broad Subject Areas Selection**:
   - *Arts & Humanities*
   - *Engineering & Technology*
   - *Life Sciences & Medicine*
   - *Natural Sciences*
   - *Social Sciences & Management*

4. **Optional Visiting Card / Staff ID Upload**:
   - Drag-and-drop or camera photo upload of institutional business cards or faculty badges.
   - Uploads directly to Firebase Storage bucket `voter_id_cards/`.

5. **Cross-Platform Sync with Android Mobile App**:
   - Stores data in the **Firestore `voters` collection**.
   - Any nomination submitted via this web portal will instantly appear in real-time in the `mobile_app` (`voter_ar_mobile`) Flutter Android app.

6. **Privacy & GDPR / UU PDP Consent**:
   - Mandatory explicit declaration consenting to receiving the official QS survey invitation email from QS Quacquarelli Symonds.

---

## 🚀 Running Locally

1. Open terminal and navigate into this folder:
   ```bash
   cd calon_voter_portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## ⚙️ Connecting to Firebase

To connect the portal directly to your live Firebase project (the same one used by `mobile_app`):

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open [Firebase Console](https://console.firebase.google.com/) -> **Project Settings** -> **General** -> Under **Your apps**, click **Web** (`</>`) to register a Web App.
3. Paste the configuration values into `.env`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
   VITE_FIREBASE_APP_ID=1:1234567890:web:...
   ```

*(Note: If `.env` is not yet configured, the app runs gracefully in Standalone Demo Mode and stores submissions safely in `localStorage` for testing).*

---

## 🌐 100% Free Hosting Deployment Guides

### Option A: Cloudflare Pages (Recommended - Unlimited Free Bandwidth)
1. Push this project to GitHub.
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) -> **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**.
3. Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Add environment variables under Settings -> Environment Variables.
5. Deploy! Your app will be live at `https://your-project.pages.dev` with a free SSL certificate.

---

### Option B: Vercel
1. Install Vercel CLI or import the GitHub repository in [Vercel](https://vercel.com).
2. Framework Preset will auto-detect as **Vite**.
3. Output Directory: `dist`.
4. Add your Firebase Environment Variables in the Vercel dashboard.
5. Deploy!

---

### Option C: Firebase Hosting (Spark Plan - 100% Free)
1. Install Firebase CLI globally if not already installed:
   ```bash
   npm install -g firebase-tools
   ```
2. In `calon_voter_portal`, run:
   ```bash
   firebase init hosting
   ```
   - Public directory: `dist`
   - Single-page app: `Yes`
   - Set up automatic builds: `No`
3. Build and deploy:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```
