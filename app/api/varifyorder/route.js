import { NextResponse } from "next/server";
import crypto from "crypto";
import { mongooseconnect } from "@/lib/mongoose";
import { Order } from "@/model/order";

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_SECRET_KEY;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request) {
  const { orderId, razorpayPaymentId, razorpaySignature, order2_id } =
    await request.json();

  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }
  await mongooseconnect();
  console.log(order2_id);
  const updatedorder = await Order.updateOne(
    { order_id: order2_id },
    { $set: { paid: true } }
  );
  console.log(updatedorder);
  // Probably some database calls here to update order or add premium status to user
  return NextResponse.json(
    { message: "payment verified successfully", isOk: true },
    { status: 200 }
  );
}
