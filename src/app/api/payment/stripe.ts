import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

const PLANS = {
  Pro: { priceId: process.env.STRIPE_PRICE_PRO },
  Ultra: { priceId: process.env.STRIPE_PRICE_ULTRA },
  Enterprise: { priceId: process.env.STRIPE_PRICE_ENTERPRISE },
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, plan } = body;
  if (!email || !plan || !PLANS[plan]) {
    return NextResponse.json({ error: "Missing or invalid email/plan" }, { status: 400 });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: PLANS[plan].priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?plan=${plan}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    });
    return NextResponse.json({ success: true, checkoutUrl: session.url });
  } catch (err) {
    return NextResponse.json({ error: "Stripe error", details: String(err) }, { status: 500 });
  }
}
