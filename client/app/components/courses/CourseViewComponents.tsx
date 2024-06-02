import { styles } from "@/app/styles/style";
import { noAvatar } from "@/app/utils/constants";
import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";

//? Course Benefits Component
export const CourseBenefits = ({ data, title }: any) => {

    return (
        <>
            <h1 className="text-[25px] font-Poppins font-[600]">{title}</h1>
            {data?.map((benefit: any) => (
                <div
                    className="w-full flex 800px:items-center py-2"
                    key={benefit.title}
                >
                    <div className="mr-1 w-[15px]">
                        <IoCheckmarkDoneOutline size={20} />
                    </div>
                    <p className="pl-2">{benefit.title}</p>
                </div>
            ))}
        </>
    );
};

type ReviewProps = {
    review: any,
    handleReviewReply?: any,
    canReplyReview?: boolean,
    ResultReviewReply?: any,
    user?: any
}
export const CourseReviews = ({ review, user, canReplyReview = false, handleReviewReply, ResultReviewReply }: ReviewProps) => {
    const [isReviewReplyActive, setIsReviewReplyActive] = useState(false)
    const [reviewReply, setReviewReply] = useState('')


    useEffect(() => {
        if (ResultReviewReply?.isSuccess) {
            setReviewReply("");
        }
    }, [ResultReviewReply?.isSuccess]);
    return (
        <>
            <div className="w-full flex py-4">
                <div className="flex">
                    <div className="w-[50px] h-[50px]">
                        <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            <h1 className="uppercase text-[18px]">
                                {review.user?.name.slice(0, 2)}
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="pl-2">
                    <div className="flex items-center">
                        <h5 className="text-[18px] pr-2">{review.user.name}</h5>
                        <Rating value={review.rating} precision={0.5} emptyIcon={<StarBorder className='text-[orange]' />} readOnly />

                    </div>
                    <p className="hidden 800px:block">{review.comment}</p>
                    <small>{format(review.createdAt)}</small>
                </div>
            </div>
            {canReplyReview &&
                <div className="w-full flex">
                    <div className="flex dark:text-[#ffffff83]">
                        {
                            user?.role === 'admin' ? <span
                                className="800px:pl-16  cursor-pointer mr-2"
                                onClick={() => setIsReviewReplyActive(!isReviewReplyActive)}
                            >
                                {!isReviewReplyActive
                                    ? review?.commentReplies?.length !== 0
                                        ? "All Replies"
                                        : "Add Reply"
                                    : "Hide Replies"}
                            </span> : <span
                                className="800px:pl-16  cursor-pointer mr-2"
                                onClick={() => setIsReviewReplyActive(!isReviewReplyActive)}
                            >
                                {!isReviewReplyActive
                                    ? review?.commentReplies?.length !== 0
                                        ? "All Replies"
                                        : ""
                                    : "Hide Replies"}
                            </span>
                        }
                       {review?.commentReplies?.length !== 0 && <>
                        <BiMessage size={20} className="cursor-pointer" />
                        <span className="pl-1 mt-[-4px]">
                            {review?.commentReplies?.length}
                        </span>
                       </>
                        }
                    </div>
                </div>
            }
            <>
                {isReviewReplyActive && (
                    <>
                        {review?.commentReplies?.map((reply: any, index: number) => (
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
                                    <p>{reply.comment}</p>
                                    <small className="dark:text-[#ffffff83]">
                                        {format(reply?.createdAt) || "--"}.
                                    </small>
                                </div>
                            </div>
                        ))}
                        {
                            user?.role === "admin" && review?.commentReplies?.length === 0 &&

                            <div className="w-full flex relative gap-2">
                                <input
                                    type="text"
                                    placeholder="Enter your reply..."
                                    className="block 800px:ml-12 mt-2 outline-none border-b border-[#0000027] dark:border-gray-500 p-[5px] w-[95%]"
                                    value={reviewReply}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        setReviewReply(e.target.value);
                                    }}
                                />
                                <button
                                    type="submit"
                                    className={`${styles.button} !w-[80px] !min-h-[35px] !h-[35px] !py-1 text-white mt-2 rounded-md text-[14px] absolte right-0 bottom-1 disabled:cursor-not-allowed`}
                                    disabled={reviewReply === "" || ResultReviewReply.isLoading}
                                    onClick={() => handleReviewReply(reviewReply, review?._id)}
                                >
                                    Submit
                                </button>
                            </div>
                        }
                    </>
                )}
            </>

        </>
    )
}