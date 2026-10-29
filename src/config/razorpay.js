/**
 * RAZORPAY CONFIGURATION
 * 
 * ⚠️ IMPORTANT: Only the KEY_ID (public key) goes here.
 *    The KEY_SECRET lives ONLY on your backend server's environment variables.
 * 
 * After deploying your backend (see /server folder), update BACKEND_URL below.
 */

// Your Razorpay public key (safe for frontend — this is NOT the secret)
export const RAZORPAY_KEY_ID = "rzp_live_TI4o48iSjZJxEa"; // ← Replace with your actual key_id

// Your deployed backend URL (the /server Express app)
// Examples:
//   Render:  "https://portfolio-pay.onrender.com"
//   Vercel:  "https://portfolio-pay.vercel.app"
//   Railway: "https://portfolio-pay.up.railway.app"
export const PAYMENT_BACKEND_URL = "https://portfolio-7zne.onrender.com"; // ← Replace after deploying

// Currency (USD for international clients)
export const PAYMENT_CURRENCY = "USD";

// Your display name on the Razorpay checkout sheet
export const MERCHANT_NAME = "Sagar Suthar";
export const MERCHANT_DESCRIPTION = "Freelance Task Payment";
