import { mongooseconnect } from "@/lib/mongoose";
import { Order } from "@/model/order";

export async function GET(req,{params}){
    await mongooseconnect();
    const {id}=await params;
    console.log(id);
    const data=await Order.find({user_id:id});
    console.log(data);
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },})
}