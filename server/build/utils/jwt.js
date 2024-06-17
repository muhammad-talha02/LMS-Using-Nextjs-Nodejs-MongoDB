"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.refreshTokenOptions = exports.accessTokenOptions = exports.refreshTokenExpires = exports.accessTokenExpires = void 0;
require("dotenv").config();
const redis_1 = require("./redis");
// parse environment variables to integrate with fallback values
exports.accessTokenExpires = parseInt(process.env.ACCESS_TOKEN_EXPIRES || "300", 10);
exports.refreshTokenExpires = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1200", 10);
// option for cookies
exports.accessTokenOptions = {
    expires: new Date(Date.now() + exports.accessTokenExpires * 60 * 60 * 1000),
    maxAge: exports.accessTokenExpires * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true
};
exports.refreshTokenOptions = {
    expires: new Date(Date.now() + exports.refreshTokenExpires * 24 * 60 * 60 * 1000),
    maxAge: exports.refreshTokenExpires * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true
};
const sendToken = (user, statusCode, res) => {
    const accessToken = user.SignAccessToken();
    const refreshToken = user.SignRefreshToken();
    // upload session to redis
    redis_1.redis.set(user._id, JSON.stringify(user));
    // only set true for production
    if (process.env.NODE_ENV === "production") {
        exports.accessTokenOptions.secure = true;
    }
    res.cookie("access_token", accessToken, exports.accessTokenOptions);
    res.cookie("refresh_token", refreshToken, exports.refreshTokenOptions);
    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
    });
};
exports.sendToken = sendToken;
