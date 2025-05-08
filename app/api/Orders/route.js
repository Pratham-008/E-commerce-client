import { mongooseconnect } from "@/lib/mongoose";
import { Order } from "@/model/order";

export async function GET(){
    await mongooseconnect();
    const data=await Order.find({});
    console.log(data);
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },})
}