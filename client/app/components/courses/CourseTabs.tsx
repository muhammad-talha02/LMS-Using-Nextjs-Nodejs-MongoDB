import { styles } from "@/app/styles/style";
import { noAvatar } from "@/app/utils/constants";
import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { FC, useState } from "react";

export const CourseReviews = ({ user }: any) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  return (
<>
    <div className="w-full flex">
      <Image
        src={user?.avatar ? user?.avatar?.url : noAvatar}
        width={50}
        height={50}
        className="w-[50px] h-[50px] object-cover rounded-full"
        alt={user?.name}
      />
      <div className="w-full">
        <h5 className="pl-3 text-[20px] font-[500]">
          Give a Rating <span className="text-[--t-red]">*</span>
        </h5>
        <Rating
          value={rating}
          className="ml-2"
          emptyIcon={<StarBorder className="text-[orange]" />}
          onChange={(e:any) => setRating(e.target?.value)}
        />
               <textarea
          name=""
          value={review}
          onChange={(e) => setReview(e.target.value)}
          id=""
          cols={40}
          rows={5}
          placeholder="write your review"
          className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
        ></textarea>
      </div>
          </div>
      <div className="w-full flex justify-end">
      <button
          className={`${styles.button} !w-[120px] !h-[40px] mt-5 rounded-full`}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export const CoureseResources = ({ courseResources }: any) => {
  return (
    <div>
      {courseResources?.map((link: any, index: number) => {
        return (
          <div className="mb-5" key={link.title}>
            <h2 className="800px:text-[20px] 800px:inline-block">
              {link.title && link.title + ": "}
            </h2>
            <a href={link.url} className="pl-2 text-[--t-blue]">
              {link.url}
            </a>
          </div>
        );
      })}
    </div>
  );
};

type QProps = {
  user: any;
};
const QuestionsAnswersTab: FC<QProps> = ({ user }) => {
  const [question, setQuestion] = useState("");

  return (
    <>
      <div className="w-full flex">
        <Image
          src={user?.avatar ? user?.avatar?.url : noAvatar}
          width={50}
          height={50}
          className="w-[50px] h-[50px] object-cover rounded-full"
          alt={user?.name}
        />
        <textarea
          name=""
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          id=""
          cols={40}
          rows={5}
          placeholder="write your question"
          className="outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
        ></textarea>
      </div>
      <div className="flex w-full justify-end">
        <button
          className={`${styles.button} !w-[120px] !h-[40px] mt-5 rounded-full`}
        >
          Submit
        </button>
      </div>
      <div className="w-full"></div>
    </>
  );
};

export default QuestionsAnswersTab;
