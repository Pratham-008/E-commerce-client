import { mongooseconnect } from "@/lib/mongoose";
import { Products } from "@/model/product";

export async function GET(req,{params}){
    await mongooseconnect();
    const {id}=await params;
    console.log(id);
    const products = await Products.findOne({ _id: id });
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}