import { mongooseconnect } from "@/lib/mongoose";
import { Userdata } from "@/model/user";

export async function POST(req){
    await mongooseconnect();
    const {data}=await req.json();
    const {userid,username,userpassword,usermobilenumber}=data;
    console.log(userid,username,userpassword,usermobilenumber)
    try{
        const res=await Userdata.create({id:userid,name:username,password:userpassword,mobilenumber:usermobilenumber});
        return new Response("Success",{status:"210"});
    }
    catch(error){
        console.log(error);
        if(error.code===11000){
            return new Response("Id already exist",{status:"200"});
        }
        else{
            return new Response("Please Enter Valid Data",{status:"220"});
        }
    }
}