import { cookies } from "next/headers";
import { serialize } from "cookie";
import { mongooseconnect } from "@/lib/mongoose";
import { Userdata } from "@/model/user";

export async function POST(req) {
  const body = await req.json();
  const { userid: id, userpassword } = body;

  console.log("id", id);

  await mongooseconnect();

  try {
    const user = await Userdata.findOne({ id });

    if ( user?.password !== userpassword) {
      return new Response("Invalid credentials", { status: 220 });
    }
    else{

    const cookieHeader = serialize("session_token", "secure-token", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    const cookieStore = await cookies();
    cookieStore.set("session_token", "secure-token", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  


    return new Response(JSON.stringify({user}), { status: 200 });
  }
  } catch (error) {
    console.error(error);
    return new Response("Server error", { status:  210});
  }
}
