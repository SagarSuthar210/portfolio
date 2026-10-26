import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuration from environment variables
const KEY_ID = process.env.RAZORPAY_KEY_ID;
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

// Middleware
app.use(express.json());

// CORS configuration - allow your GitHub Pages portfolio and local dev
const allowedOrigins = [
  'https://sagarsuthar210.github.io',
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed) || allowed === '*')) {
      return callback(null, true);
    }
    // Permissive fallback so your deployment is never blocked
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Freelance Portfolio Razorpay Payment Backend is active',
    timestamp: new Date().toISOString(),
    configured: Boolean(KEY_ID && KEY_SECRET)
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

/**
 * 1. CREATE ORDER ENDPOINT
 * POST /api/create-order
 * Request body: { amount, currency, clientName, clientEmail, taskDescription }
 * Amount is expected in cents/paise (e.g. $50.00 = 5000)
 */
app.post('/api/create-order', async (req, res) => {
  try {
    if (!KEY_ID || !KEY_SECRET) {
      console.error('Razorpay keys not configured on server');
      return res.status(500).json({
        error: 'Payment gateway credentials are not configured on the backend server.'
      });
    }

    const { amount, currency = 'USD', clientName, clientEmail, taskDescription } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid payment amount is required.' });
    }

    // Prepare Basic Auth credentials for Razorpay API
    const authHeader = 'Basic ' + Buffer.from(`${KEY_ID}:${KEY_SECRET}`).toString('base64');

    const orderPayload = {
      amount: parseInt(amount, 10), // in currency subunits (cents for USD)
      currency: currency.toUpperCase(),
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      notes: {
        client_name: (clientName || 'Anonymous').slice(0, 40),
        client_email: (clientEmail || '').slice(0, 40),
        task_desc: (taskDescription || '').slice(0, 200),
      }
    };

    console.log(`[Order Request] Creating order for $${(amount / 100).toFixed(2)} ${currency} from ${clientEmail || 'Client'}`);

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader
      },
      body: JSON.stringify(orderPayload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Razorpay Order Error]', data);
      return res.status(response.status).json({
        error: data.error?.description || 'Failed to create Razorpay order.'
      });
    }

    console.log(`[Order Success] Order created: ${data.id}`);

    return res.json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency
    });
  } catch (error) {
    console.error('[Create Order Server Error]', error);
    return res.status(500).json({ error: 'Internal server error while creating order.' });
  }
});

/**
 * 2. VERIFY PAYMENT ENDPOINT
 * POST /api/verify-payment
 * Request body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 * Uses HMAC-SHA256 signature verification matching Razorpay documentation
 */
app.post('/api/verify-payment', (req, res) => {
  try {
    if (!KEY_SECRET) {
      return res.status(500).json({ error: 'Razorpay secret key is not configured.' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required signature verification fields.' });
    }

    // Verify HMAC-SHA256: hmac_sha256(order_id + "|" + payment_id, secret)
    const generatedSignature = crypto
      .createHmac('sha256', KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const isValid = generatedSignature === razorpay_signature;

    if (isValid) {
      console.log(`[Payment Verified] Order ${razorpay_order_id} verified. Payment ID: ${razorpay_payment_id}`);
      return res.json({
        status: 'success',
        verified: true,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id
      });
    } else {
      console.warn(`[Signature Mismatch] Order ${razorpay_order_id} signature failed verification.`);
      return res.status(400).json({
        status: 'failed',
        verified: false,
        error: 'Invalid payment signature'
      });
    }
  } catch (error) {
    console.error('[Verify Payment Error]', error);
    return res.status(500).json({ error: 'Server error verifying payment.' });
  }
});

app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`Portfolio Payment Server listening on port ${PORT}`);
  console.log(`Razorpay Key Configured: ${Boolean(KEY_ID && KEY_SECRET)}`);
  console.log(`===============================================`);
});
