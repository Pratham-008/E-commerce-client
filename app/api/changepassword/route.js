import { mongooseconnect } from "@/lib/mongoose";
import { Userdata } from "@/model/user";
export async function POST(req){
    const {password,userid}= await req.json();
    console.log(password,userid);
    await mongooseconnect();
    const respanse=await Userdata.findByIdAndUpdate(userid,{
        password})
        console.log(respanse);
    if(respanse){
        return new Response(JSON.stringify({message:"Password updated successfully"}),{status:200})
    }
    return new Response(JSON.stringify({message:"User not found"}),{status:404})
    
}