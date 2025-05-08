import { mongooseconnect } from "@/lib/mongoose";
import { Order } from "@/model/order";
import { Products } from "@/model/product";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export async function POST(req) {
  const body = await req.json();
  console.log(body);
  const {
    name,
    city,
    pincode,
    streetaddress,
    country,
    phonenumber,
    products,
    amount,
    Userid,
  } = body;

  const productIds = products.split(",");
  const uniqueproductId = [...new Set(productIds)];
  await mongooseconnect();
  const productinfos = await Products.find({ _id: uniqueproductId });
  const lineitems = [];
  for (const productId of uniqueproductId) {
    const productInfo = productinfos.find(
      (p) => p._id.toString() === productId
    );
    const quantity = productIds.filter((id) => id == productId)?.length || 0;
    if (quantity > 0) {
      lineitems.push({
        quantity,
        price_data: {
          currency: "INR",
          product_data: { name: productInfo.name },
          unit_amount: quantity * productInfo.price,
        },
      });
    }
  }
  console.log(lineitems);

  const order = await razorpay.orders.create({
    amount: amount,
    currency: "INR",
  });

  console.log(Userid)
  const orderdata = await Order.create({
    lineitems,
    user_id:Userid,
    name,
    city,
    pincode,
    streetaddress,
    country,
    phonenumber,
    paid: false,
    order_id: order.id,
    order_status: "pending",
  });
  console.log(orderdata);
  console.log(amount);
  return NextResponse.json(order);
}
