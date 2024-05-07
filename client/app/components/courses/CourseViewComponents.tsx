import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
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


export const CourseReviews = ({ review }: any) => {
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
        </>
    )
}