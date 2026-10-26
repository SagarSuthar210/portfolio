# Razorpay Payment Backend (for Sagar Suthar's Freelance Portfolio)

This is a lightweight Node.js/Express server that safely holds your **Razorpay Key Secret** and handles:
1. `POST /api/create-order`: Calls Razorpay Orders API with Basic Auth to generate an `order_id` in USD.
2. `POST /api/verify-payment`: Cryptographically validates the HMAC-SHA256 signature returned by Razorpay Checkout sheet.

---

## 🔒 Security Best Practice
- **RAZORPAY_KEY_ID** (public key) can exist in frontend configuration (`src/config/razorpay.js`).
- **RAZORPAY_KEY_SECRET** must **NEVER** be committed to GitHub or placed in frontend code. It is stored exclusively in this backend's environment variables.

---

## 🚀 Free 2-Minute Deployment (Render.com)

1. Go to [https://dashboard.render.com](https://dashboard.render.com) and sign in with GitHub.
2. Click **New +** -> **Web Service**.
3. Select your GitHub repository: `SagarSuthar210/portfolio`.
4. Configure the settings:
   - **Name**: `portfolio-payment-backend` (or any name)
   - **Region**: Choose Singapore, Frankfurt, or Oregon
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Instance Type**: `Free`
5. Scroll down to **Environment Variables** and add:
   - `RAZORPAY_KEY_ID`: `rzp_live_...` (your Razorpay key id)
   - `RAZORPAY_KEY_SECRET`: `...` (your Razorpay key secret)
   - `FRONTEND_URL`: `https://sagarsuthar210.github.io`
6. Click **Create Web Service**.
7. Once deployed, Render will give you a public URL like:
   `https://portfolio-payment-backend-xxxx.onrender.com`
8. In your portfolio project, open `src/config/razorpay.js` and set:
   ```js
   export const RAZORPAY_KEY_ID = "rzp_live_your_actual_key_id";
   export const PAYMENT_BACKEND_URL = "https://portfolio-payment-backend-xxxx.onrender.com";
   ```
9. Run `npm run build` and deploy your portfolio!

---

## 💻 Local Testing

1. In the `server` directory:
   ```bash
   cd server
   npm install
   ```
2. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Add your Razorpay keys inside `.env`.
3. Start the server:
   ```bash
   npm start
   ```
   Server runs on `http://localhost:5000`.
