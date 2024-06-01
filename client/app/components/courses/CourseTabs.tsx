import useMutation from "@/app/_hooks/useMutation";
import { styles } from "@/app/styles/style";
import { noAvatar } from "@/app/utils/constants";
import { socketId } from "@/app/utils/socket";
import {
  useAddAnswerMutation,
  useAddNewQuestionMutation,
} from "@/redux/features/courses/coursesApi";
import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import toast, { useToasterStore } from "react-hot-toast";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

export const CourseReviewForm = ({ user, handleReviewSubmit, ResultReview }: any) => {
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
            onChange={(e: any) => setRating(e.target?.value)}
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
          className={`${styles.button} !w-[120px] !h-[40px] mt-5 rounded-full ${ResultReview.isLoading && "cursor-not-allowed"}`}
          onClick={() => handleReviewSubmit(review, rating)}
        >
          {ResultReview.isLoading ? "Submitting....." : "Submit"}
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
  courseId: any;
  activeVideo: any;
};
const QuestionsAnswersTab: FC<QProps> = ({ user, activeVideo, courseId }) => {
  const [question, setQuestion] = useState("");
  const { actionApi: addNewQuestionAction, result } = useMutation({
    api: useAddNewQuestionMutation,
    successMsg: "Question Added Successfully",
    successFunc: () => {
      setQuestion("");
      socketId.emit("notification", {
        title:"New Question Recieved",
        message: `You have a new Question in ${activeVideo?.title}`,
        userId:user?._id
      })
    },
  });
  console.log("vd", activeVideo);
  const handleCreateQuestion = async () => {
    if (question.length === 0) {
      toast.error("Question can't be empty ");
    } else {
      let obj = {
        question,
        courseId,
        contentId: activeVideo?._id,
      };
      await addNewQuestionAction(obj);
    }
  };

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
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          id="question"
          cols={40}
          rows={5}
          placeholder="write your question"
          className="outline-none bg-transparent ml-3 border border-gray-600 dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
        ></textarea>
      </div>
      <div className="flex w-full justify-end">
        <button
          className={`${styles.button} !w-[120px] !h-[40px] mt-5 rounded-full disabled:cursor-not-allowed`}
          onClick={handleCreateQuestion}
          disabled={result.isLoading}
        >
          {result.isLoading ? "Submiting...." : "Submit"}
        </button>
      </div>
      <div className="w-full"></div>
    </>
  );
};

export default QuestionsAnswersTab;

type QuestionReplyProps = {
  courseContentData: any;
  activeVideo: any;
  // answer: any,
  // setAnswer: (answer: string) => void,
  ResultAnswer: any;
  user: any;
  handleAnswerSubmit: (questionId: string, answer: string) => void;
};

export const QuestionReply = (props: QuestionReplyProps) => {
  const {
    courseContentData,
    activeVideo,
    ResultAnswer,
    user,
    handleAnswerSubmit,
  } = props;

  return (
    <>
      <div className="w-full my-3">
        {courseContentData?.[activeVideo]?.questions?.map(
          (question: any, index: number) => (
            <>
              <CommentItem
                key={question?._id}
                courseContentData={courseContentData}
                activeVideo={activeVideo}
                item={question}
                index={index}
                ResultAnswer={ResultAnswer}
                // answer={answer}
                // setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
              />
            </>
          )
        )}
      </div>
    </>
  );
};

const CommentItem = (props: any) => {
  const {
    courseContentData,
    item,
    activeVideo,
    handleAnswerSubmit,
    ResultAnswer,
  } = props;
  const [isReplyActive, setIsReplyActive] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    if (ResultAnswer.isSuccess) {
      setAnswer("");
    }
  }, [ResultAnswer.isSuccess]);

  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          <div className="w-[50px] h-[50px]">
            <Image
              src={item?.user?.avatar ? item?.user?.avatar?.url : noAvatar}
              width={50}
              height={50}
              className="w-[50px] h-[50px] object-cover rounded-full"
              alt={item?.user?.name}
            />
            {/* <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
            <h1 className="uppercase text-[18px]">
              {item?.user?.name?.slice(0, 2)}
            </h1>
          </div> */}
          </div>
          <div className="pl-3">
            <h5 className="text-[20px]">{item?.user?.name}</h5>
            <p>{item.question}</p>
            <small className="dark:text-[#ffffff83]">
              {format(item?.createdAt) || "--"}.
            </small>
          </div>
        </div>
        <div className="w-full flex">
          <div className="flex dark:text-[#ffffff83]">
            <span
              className="800px:pl-16  cursor-pointer mr-2"
              onClick={() => setIsReplyActive(!isReplyActive)}
            >
              {!isReplyActive
                ? item?.questionReplies?.length !== 0
                  ? "All Replies"
                  : "Add Reply"
                : "Hide Replies"}
            </span>
            <BiMessage size={20} className="cursor-pointer" />
            <span className="pl-1 mt-[-4px]">
              {item?.questionReplies?.length}
            </span>
          </div>
        </div>
        {isReplyActive && (
          <>
            {item?.questionReplies?.map((reply: any, index: number) => (
              <div className="w-full flex 800px:ml-16 my-5" key={reply?._id}>
                <Image
                  src={
                    reply?.user?.avatar ? reply?.user?.avatar?.url : noAvatar
                  }
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  alt={reply?.user?.name}
                />
                <div className="pl-3">
                  <div className="flex items-center gap-1">
                    <h5 className="text-[20px]">{reply?.user?.name}</h5>
                    {reply?.user?.role === "admin" && <VscVerifiedFilled size={15} className="text-green-600" />}
                  </div>
                  <p>{reply.answer}</p>
                  <small className="dark:text-[#ffffff83]">
                    {format(reply?.createdAt) || "--"}.
                  </small>
                </div>
              </div>
            ))}
            <div className="w-full flex relative gap-2">
              <input
                type="text"
                placeholder="Enter your reply..."
                className="block 800px:ml-12 mt-2 outline-none border-b border-[#0000027] dark:border-gray-500 p-[5px] w-[95%]"
                value={answer}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setAnswer(e.target.value);
                }}
              />
              <button
                type="submit"
                className={`${styles.button} !w-[80px] !min-h-[35px] !h-[35px] !py-1 text-white mt-2 rounded-md text-[14px] absolte right-0 bottom-1 disabled:cursor-not-allowed`}
                disabled={answer === "" || ResultAnswer.isLoading}
                onClick={() => handleAnswerSubmit(item?._id, answer)}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
