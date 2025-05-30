import { Twilio } from "twilio";

export async function GET(){
    const usersid = process.env.TWILIO_ACCOUNT_SID;
    const authtoken=process.env.TWILIO_AUTH_TOKEN;
    const phonenumber = "+919925191465";
    const client = new Twilio(usersid, authtoken);

    const otp=Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    
    client.messages
      .create({
        body: `Your OTP is ${otp}`,
        from: "+12543308702",
        to: phonenumber,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error)); // Handle any errors that occur during the request
  
    return new Response(otp, { status: 200 });
}