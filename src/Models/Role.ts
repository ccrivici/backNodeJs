import mongoose, { model } from "mongoose";

export const ROLES=["user","admin","moderator"];

const roleSchema = new mongoose.Schema({
    name:{
        type:String
    }
},{versionKey:false})


export default model("Role",roleSchema)