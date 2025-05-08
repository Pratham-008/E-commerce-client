import { mongooseconnect } from "@/lib/mongoose";
import { Products } from "@/model/product";
import { NextResponse } from "next/server";

export async function POST(req) {
  await mongooseconnect();
  const body = await req.json();
  const { cartproducts } = body;
  const products = await Products.find({ _id: { $in: cartproducts } });

  return NextResponse.json(
    { products },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
