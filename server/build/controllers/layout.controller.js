"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayout = exports.updateLayout = exports.createLayout = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const layout_model_1 = __importDefault(require("../models/layout.model"));
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.createLayout = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        const isTypeExist = await layout_model_1.default.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler_1.default(`${type} is already exist`, 400));
        }
        if (type === "Banner") {
            const { image, title, subTitle } = req.body;
            const myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                folder: "layout",
            });
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subTitle,
            };
            await layout_model_1.default.create({ type, banner });
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            await layout_model_1.default.create({ type: "FAQ", faq });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const catItem = await Promise.all(categories.map(async (item) => {
                return {
                    title: item.title,
                };
            }));
            await layout_model_1.default.create({ type, categories: catItem });
        }
        res.status(200).json({
            sucess: true,
            message: "Created Sucessfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
// Edit Layout ---admin-only
exports.updateLayout = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.body;
        if (type === "Banner") {
            const bannerData = await layout_model_1.default.findOne({ type: "Banner" });
            const { image, title, subTitle } = req.body;
            //? To check we need to update image or not
            const isImageUpdate = image.startsWith("https") ? false : true;
            let myCloud;
            if (isImageUpdate) {
                //? If True it will remove the old one and upload new on cloudinary
                await cloudinary_1.default.v2.uploader.destroy(bannerData?.banner.image.public_id);
                myCloud = await cloudinary_1.default.v2.uploader.upload(image, {
                    folder: "layout",
                });
            }
            else {
                //? Otherwise it keeps the old data
                myCloud = bannerData?.banner.image;
            }
            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url || myCloud.url,
                },
                title,
                subTitle,
            };
            await layout_model_1.default.findByIdAndUpdate(bannerData?._id, { banner });
        }
        if (type === "FAQ") {
            const { faq } = req.body;
            const FAQID = await layout_model_1.default.findOne({ type: "FAQ" });
            await layout_model_1.default.findByIdAndUpdate(FAQID?._id, { type: "FAQ", faq });
        }
        if (type === "Categories") {
            const { categories } = req.body;
            const categoriesID = await layout_model_1.default.findOne({
                type: "Categories",
            });
            const catItem = await Promise.all(categories.map(async (item) => {
                return {
                    title: item.title,
                };
            }));
            await layout_model_1.default.findByIdAndUpdate(categoriesID?._id, {
                type,
                categories: catItem,
            });
        }
        res.status(200).json({
            sucess: true,
            message: "Updated Sucessfully",
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
// get Layout by type
exports.getLayout = (0, catchAsyncErrors_1.catchAsyncError)(async (req, res, next) => {
    try {
        const { type } = req.params;
        const layout = await layout_model_1.default.findOne({ type });
        if (!layout) {
            return next(new ErrorHandler_1.default(`${type} not found`, 404));
        }
        else {
            res.status(200).json({
                sucess: true,
                layout,
            });
        }
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 404));
    }
});
