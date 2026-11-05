# Storify E-Commerce Storefront

A high-performance, responsive e-commerce storefront built with pure HTML, CSS, and Vanilla JavaScript. Features 130 local product and brand assets, responsive mobile layout with fixed bottom navigation, and full SPA routing.

---

## 📁 Directory Structure
```
├── index.html        # Main storefront HTML (all sections, components, modals)
├── server.js         # Local static server with SPA fallback (Node.js)
├── .htaccess         # Apache / LiteSpeed / cPanel SPA rewrite & caching
├── vercel.json       # Vercel SPA rewrite configuration
├── _redirects        # Netlify SPA rewrite configuration
├── css/
│   ├── storify.css   # Core design system & layout styling
│   └── style.css     # Custom animations, tabs, mobile nav & footer styling
├── js/
│   └── app.js        # Interactive engine (Tabs, Cart, Search, Quick View, Slider)
└── assets/
    └── images/       # 130 local high-definition product, category & vendor assets
```

---

## 🚀 How to Run Locally

### Option 1: Built-in Node.js Server
```bash
node server.js
```
Then visit: `http://localhost:3000/`

### Option 2: Direct File
Simply open `index.html` directly in Chrome, Edge, Safari, or Firefox.

---

## 🌐 Live Deployment Guide (Step-by-Step)

Because this website uses SPA-style URLs (e.g. `/products`, `/track-order`, `/contact`), servers must serve `index.html` for all subpages so visitors never see a `404 Not Found` error.

### 1. Deploying to cPanel (Apache / LiteSpeed)
1. In your local folder (`d:\ecommdemo`), select all files and folders:
   - `index.html`
   - `.htaccess` *(make sure hidden files are visible)*
   - `css/`
   - `js/`
   - `assets/`
2. Right-click and choose **Compress to ZIP file** (name it `storify.zip`).
3. Log into your **cPanel** dashboard.
4. Open **File Manager** and navigate into `public_html` (or your subdomain directory).
5. Click **Upload** and upload `storify.zip`.
6. Right-click `storify.zip` in File Manager and select **Extract**.
7. Ensure `.htaccess` is extracted in the root of `public_html`.
8. Visit your live domain — your website is immediately live with clean URLs and 0 errors!

---

### 2. Deploying to aaPanel (Nginx or Apache)
#### If using Nginx on aaPanel:
1. Log into your **aaPanel** and go to **Website** > **Add Site**.
2. Enter your domain name and create the site.
3. Upload and extract your files into the site's root directory (`/www/wwwroot/yourdomain.com/`).
4. Click on your website in aaPanel to open site settings.
5. Go to the **URL Rewrite** tab on the left.
6. Select `0.Current` and paste this rule:
   ```nginx
   location / {
       try_files $uri $uri/ /index.html;
   }
   ```
7. Click **Save**. Done!

#### If using Apache on aaPanel:
- The included `.htaccess` file handles all URL rewriting and caching automatically!

---

### 3. Deploying to Vercel (Fastest & Free Global CDN)
1. Install Vercel CLI (or connect GitHub):
   ```bash
   npm i -g vercel
   vercel
   ```
2. Or drag and drop the folder directly into the [Vercel Dashboard](https://vercel.com/new).
3. The included `vercel.json` ensures all routes automatically serve `index.html`.

---

### 4. Deploying to Netlify (Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `d:\ecommdemo` folder into the browser window.
3. The included `_redirects` file automatically handles client-side routing.
