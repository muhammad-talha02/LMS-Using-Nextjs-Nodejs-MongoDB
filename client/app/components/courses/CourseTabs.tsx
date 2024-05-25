import useMutation from "@/app/_hooks/useMutation";
import { styles } from "@/app/styles/style";
import { noAvatar } from "@/app/utils/constants";
import { useAddNewQuestionMutation } from "@/redux/features/courses/coursesApi";
import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import React, { FC, useState } from "react";
import toast from "react-hot-toast";
import { BiMessage } from "react-icons/bi";
import { format } from "timeago.js";

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
  user: any,
  courseId: any,
  activeVideo: any
};
const QuestionsAnswersTab: FC<QProps> = ({ user, activeVideo, courseId }) => {
  const [question, setQuestion] = useState("");
  const { actionApi: addNewQuestionAction, result } = useMutation({
    api: useAddNewQuestionMutation,
    successMsg: "Question Added Successfully",
    successFunc: () => {
      setQuestion("")
    }
  })
  console.log("vd", activeVideo)
  const handleCreateQuestion = async () => {
    if (question.length === 0) {
      toast.error("Question can't be empty ")
    }
    else {
      let obj = {
        question,
        courseId,
        contentId: activeVideo?._id
      }
      await addNewQuestionAction(obj)
    }
  }

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
  courseContentData: any,
  activeVideo: any,
  answer: any,
  setAnswer: (answer: string) => void,
  user: any,
  setAnswerId: (answerId: any) => void,
  handleAnswerSubmit: () => void
}

export const QuestionReply = (props: QuestionReplyProps) => {
  const { courseContentData, activeVideo, answer, setAnswer, user, setAnswerId, handleAnswerSubmit } = props
  return (
    <>
      <div className="w-full my-3">
        {
          courseContentData?.[activeVideo]?.questions?.map((question: any, index: number) => (
            <>
              <CommentItem key={question?._id}
                courseContentData={courseContentData}
                activeVideo={activeVideo}
                item={question}
                index={index}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
              />
            </>
          ))
        }
      </div>
    </>
  )
}



const CommentItem = (props: any) => {
  const { courseContentData, item, activeVideo, answer, setAnswer, handleAnswerSubmit } = props
  const [isReplyActive, setIsReplyActive] = useState(false)
  return <>
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
          <small className="dark:text-[#ffffff83]">{format(item?.createdAt) || '--'}.</small>
        </div>
      </div>
      <div className="w-full flex">
        <div className="flex dark:text-[#ffffff83]">
          <span className="800px:pl-16  cursor-pointer mr-2" onClick={() => setIsReplyActive(!isReplyActive)}>
            {
              !isReplyActive ? item?.questionReplies?.length !== 0 ? "All Replies" : "Add Reply" : "Hide Replies"
            }
          </span>
          <BiMessage size={20} className="cursor-pointer" />
          <span className="pl-1 mt-[-4px]">{item?.questionReplies?.length}</span>
        </div>
      </div>
      {
        isReplyActive && <>
          {
            item?.questionReplies?.map((reply: any, index: number) => (
              <div className="w-full flex 800px:ml-16 my-5">
                <Image
                  src={reply?.user?.avatar ? reply?.user?.avatar?.url : noAvatar}
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] object-cover rounded-full"
                  alt={reply?.user?.name}
                />
                <div className="pl-3">
                  <h5 className="text-[20px]">{reply?.user?.name}</h5>
                  <p>{reply.answer}</p>
                  <small className="dark:text-[#ffffff83]">{format(reply?.createdAt) || '--'}.</small>
                </div>
              </div>
            ))
          }
        </>
      }
    </div>
  </>
}