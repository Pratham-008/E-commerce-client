import { mongooseconnect } from "@/lib/mongoose";
import { Products } from "@/model/product";

export async function GET() {
  await mongooseconnect();
  const featuredProductId = "68050a09bce75e857d638f6f";
  const product = await Products.findById(featuredProductId).lean();
  const newproducts = await Products.find({}).sort({ updatedAt: -1 }).lean();
  console.log(newproducts);
  console.log("product",product);

  return new Response(JSON.stringify({newproducts,product}), { status: 200, headers: { "Content-Type": "application/json" },});
}
