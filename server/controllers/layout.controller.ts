import { NextFunction, Request, Response } from "express";
import { catchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";

export const createLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      const isTypeExist = await LayoutModel.findOne({ type });

      if (isTypeExist) {
        return next(new ErrorHandler(`${type} is already exist`, 400));
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
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
        await LayoutModel.create({ type, banner });
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        await LayoutModel.create({ type: "FAQ", faq });
      }
      if (type === "Categories") {
        const { categories } = req.body;

        const catItem = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await LayoutModel.create({ type, categories: catItem });
      }

      res.status(200).json({
        sucess: true,
        message: "Created Sucessfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

// Edit Layout ---admin-only

export const updateLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (type === "Banner") {
        const bannerData: any = await LayoutModel.findOne({ type: "Banner" });
        const { image, title, subTitle } = req.body;

        //? To check we need to update image or not
        const isImageUpdate = image.startsWith("https") ? false : true;
        let myCloud;

        if (isImageUpdate) {
          //? If True it will remove the old one and upload new on cloudinary
          await cloudinary.v2.uploader.destroy(
            bannerData?.banner.image.public_id
          );
          myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "layout",
          });
        } else {
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
        await LayoutModel.findByIdAndUpdate(bannerData?._id, { banner });
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const FAQID: any = await LayoutModel.findOne({ type: "FAQ" });
        await LayoutModel.findByIdAndUpdate(FAQID?._id, { type: "FAQ", faq });
      }
      if (type === "Categories") {
        const { categories } = req.body;

        const categoriesID: any = await LayoutModel.findOne({
          type: "Categories",
        });
        const catItem = await Promise.all(
          categories.map(async (item: any) => {
            return {
              title: item.title,
            };
          })
        );

        await LayoutModel.findByIdAndUpdate(categoriesID?._id, {
          type,
          categories: catItem,
        });
      }

      res.status(200).json({
        sucess: true,
        message: "Updated Sucessfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);

// get Layout by type

export const getLayout = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.params;

      const layout = await LayoutModel.findOne({ type });
      if (!layout) {
        return next(new ErrorHandler(`${type} not found`, 404));
      } else {
        res.status(200).json({
          sucess: true,
          layout,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 404));
    }
  }
);
