import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { setUserPlan } from "@/data/user-plan";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const buf = Buffer.from(await req.arrayBuffer());
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Webhook Error", details: String(err) },
      { status: 400 },
    );
  }

  // Handle subscription events
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    // Stripe Checkout Session does not expose plan directly; use metadata
    let plan: string | undefined = session.metadata?.plan;
    if (email && plan) {
      await setUserPlan(email, plan);
    }
  }
  if (event.type === "customer.subscription.updated") {
    // Optionally handle subscription upgrade/downgrade
  }
  if (event.type === "customer.subscription.deleted") {
    // Optionally handle subscription cancellation
  }
  return NextResponse.json({ received: true });
}
