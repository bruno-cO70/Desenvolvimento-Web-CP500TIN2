import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();

const app = express();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { metodo, total } = req.body;

    const valorEmCentavos = Math.round(Number(total) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: metodo === "pix" ? ["pix"] : ["card"],

      line_items: [
        {
          price_data: {
            currency: "brl",

            product_data: {
              name: "Compra BevShop",
            },

            unit_amount: valorEmCentavos,
          },

          quantity: 1,
        },
      ],

      success_url: `${process.env.VITE_APP_URL}/#/pedidos`,
      cancel_url: `${process.env.VITE_APP_URL}/#/pagamento`,
    });

    res.json({ url: session.url });

  } catch (error) {
    console.log("Erro Stripe:", error.message);

    res.status(500).json({
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});