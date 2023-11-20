require("dotenv").config()
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken"


const emailRegPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<Boolean>;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: Boolean;
  courses: Array<{ courseId: string }>;
  SignAccessToken:()=> string;
  SignRefreshToken:()=> string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter your email"],
      validate: {
        validator: (value: string) => {
          return emailRegPattern.test(value);
        },
        message: "Please write valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      // required: [true, "Please enter your password"],
      // minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

// Hash Password

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Sign Access Token

userSchema.methods.SignAccessToken = function(){
  return jwt.sign({id:this.id}, process.env.ACCESS_TOKEN as Secret || '', {expiresIn:"5m"})
}


// Sign Refresh Token

userSchema.methods.SignRefreshToken = function (){
  return jwt.sign({id:this.id}, process.env.REFRESH_TOKEN as Secret || '', {expiresIn:"3d"})
}


// compare password

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<Boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);

export default userModel;
