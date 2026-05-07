# 💎 iGugu Bank

> Your Treasure Bank — A modern South African banking app

## 🚀 Deploy in 4 Steps

### 1. Install dependencies
```bash
npm install
```

### 2. Run locally
```bash
npm start
```
Opens at http://localhost:3000

---

## 📤 Push to GitHub

```bash
git init
git add .
git commit -m "🚀 iGugu Bank — initial launch"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/igugu-bank.git
git push -u origin main
```

---

## ☁️ Deploy to Vercel

### Option A — Vercel Dashboard (easiest)
1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Import your GitHub repo `igugu-bank`
4. Framework preset: **Create React App**
5. Click **Deploy** ✅

### Option B — Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📱 App Screens

| Screen | Route | Description |
|--------|-------|-------------|
| Splash | `/` | Landing with Open Account + Sign In |
| Onboarding | `/onboard` | 5-step ID-only account opening |
| PIN Login | `/pin-login` | Secure 5-digit PIN entry |
| Home | `/home` | Dashboard with balance, pre-approval, transactions |
| Send Money | `/send` | PayShap with beneficiary selection & numpad |
| Pockets | `/pockets` | Savings goals with interest tracking |
| Loans | `/loans` | Pre-approved loan offers + loan types |
| Transactions | `/transactions` | Full history with search, filter, export |
| Profile | `/profile` | Account settings & sign out |

---

## ✨ Key Features

- **Smart Pre-Approval** — instant loan offer on home screen using ID + credit bureau
- **Fee Transparency** — every fee explained with a tap, no hidden charges
- **Beneficiary Cloud Sync** — beneficiaries never disappear
- **Balance Protection** — warns before sending if balance will drop too low
- **Live Loan Calculator** — drag slider, see full cost breakdown in real time
- **Export Statement** — one-tap CSV download
- **Refer a Friend** — built-in growth loop with R50 reward

---

## 🛠 Tech Stack

- React 18
- React Router v6
- Context API (global state)
- CSS-in-JS (inline styles with design tokens)
- Font Awesome icons
- Google Fonts (Playfair Display + DM Sans)

---

## 📄 License
Built for iGugu Bank © 2026
