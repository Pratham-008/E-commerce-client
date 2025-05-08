import { model, models, Schema } from "mongoose"

const UserSchema =new Schema({

    name:String,
    id:{type:String,unique:true,},
    password:String,
    mobilenumber:{type:String, match: /^[0-9]{10}$/},

},
{timestamps:true})

export const Userdata=models?.Userdata || model("Userdata",UserSchema)