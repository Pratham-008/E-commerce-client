import { Twilio } from "twilio";

export async function GET(){
    const usersid = "ACc851a779eda7642f2e71ea221094e3f5";
    const authtoken="64b20571f1e484a8cde2b7a0e728916f";
    const phonenumber = "+919925191465";
    const client = new Twilio(usersid, authtoken);

    const otp=Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    
    client.messages
      .create({
        body: `Your OTP is ${otp}`,
        from: "+13612661460",
        to: phonenumber,
      })
      .then((message) => console.log(message.sid))
      .catch((error) => console.error(error)); // Handle any errors that occur during the request
  
    return new Response(otp, { status: 200 });
}