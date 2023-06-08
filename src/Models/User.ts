import mongoose, { Schema, model, Document,Model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

/* userSchema.statics.encryptPassword = async (password:string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}; */

userSchema.static('comparePassword', async (password:string, receivedPassword:string) => {
    return await bcrypt.compare(password, receivedPassword)
})
userSchema.static('encryptPassword', async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
    
})

        ////////////////////////////
interface IUserDocument extends Document {
    email: string;
    name: string;
    password: string;
    roles:Array<any>;
}
export interface IUser extends IUserDocument {
}

export interface IUserModel extends Model<IUser> {
    encryptPassword(password: string): string;
    comparePassword(password: string,receivedPassword:string): boolean; 
}

export const User: IUserModel = model<IUser, IUserModel>('User', userSchema);

export default User;

//export default mongoose.model("User", userSchema)