"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const emailRegPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your email"],
        validate: {
            validator: (value) => {
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
}, { timestamps: true });
// Hash Password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
// Sign Access Token
userSchema.methods.SignAccessToken = function () {
    return jsonwebtoken_1.default.sign({ id: this.id }, process.env.ACCESS_TOKEN || '', { expiresIn: "5m" });
};
// Sign Refresh Token
userSchema.methods.SignRefreshToken = function () {
    return jsonwebtoken_1.default.sign({ id: this.id }, process.env.REFRESH_TOKEN || '', { expiresIn: "3d" });
};
// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
