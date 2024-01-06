import mongoose, { Document, Schema, model } from "mongoose";

interface IFaqItem extends Document {
  question: string;
  answer: string;
}

interface ICategory extends Document {
  title: string;
}

interface IBannerImg extends Document {
  public_id: string;
  url: string;
}

interface ILayout extends Document {
  type: string;
  faq: IFaqItem[];
  categories: ICategory[];
  banner: {
    image: IBannerImg;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<IFaqItem>({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const catgeorySchema = new Schema<ICategory>({
  title: { type: String },
});

const bannerImgSchema = new Schema<IBannerImg>({
  public_id: {
    type: String,
  },
  url: {
    type: String,
  },
});

const layoutSchema = new Schema<ILayout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [catgeorySchema],
  banner: {
    image: bannerImgSchema ,
    title: { type: String },
    subTitle: { type: String },
  },
});

const LayoutModel = model<ILayout>("Layout", layoutSchema);

export default LayoutModel;
