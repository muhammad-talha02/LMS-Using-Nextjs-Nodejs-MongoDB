import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import React, { FC } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

type Props = {
  course: any;
};

//? Course Benefits Component
const CourseBenefits = ({ data, title }: any) => {

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

const CourseDetail: FC<Props> = ({ course }) => {
  const { user } = useSelector((state: any) => state.auth);
  const ratings = Number(course?.ratings)
  const courseRating = Number.isInteger(ratings) ? ratings.toFixed(1) : ratings.toFixed(2)

  const discountPercentage =
    ((course?.estimatedPrice - course?.price) / course?.estimatedPrice) * 100;
  const discountPercentagePrice = discountPercentage.toFixed(0);
  console.log(discountPercentage, "user");

  const isPurchased =
    user && user?.courses.find((item: any) => item?._id === course?._id);
  return (
    <div>
      <div className="w-[90%] m-auto py-5">
        <div className="w-full flex flex-col 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5">
            <h1 className="text-black dark:text-white text-[25px] font-Poppins font-[600]">
              {course?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center gap-2">
                <Rating
                  value={5}
                  precision={0.5}
                  emptyIcon={<StarBorder className="text-[orange]" />}
                  readOnly
                />
                <h5>{course?.reviews?.length} Reviews</h5>
              </div>
              <h5>{course?.purchased} Students</h5>
            </div>
            {/* Course Benefits  */}
            <div className="my-3">
              <CourseBenefits
                data={course?.benefits}
                title="What will you learn from this course?"
              />
            </div>
            {/* Course Prequesites  */}
            <div className="my-3">
              <CourseBenefits
                data={course?.prequesities}
                title="What are the Prerequesities of this course?"
              />
            </div>
            <h1 className="text-[28px] font-semibold">Couse Overview</h1>
            <div className="w-full">
              {/* Course Rating * {course?.reviews?.length} Reviews */}
              <h1 className="text-[25px] font-semibold">Couse Details</h1>
              <p className="mt-5 text-[18px] w-full overflow-hidden whitespace-pre-line">
                {course?.description}
              </p>
            </div>
            <div className="w-full">
              <div className="800px:flex item-center gap-2">
                <Rating
                  value={3.5}
                  precision={0.5}
                  emptyIcon={<StarBorder className="text-[orange]" />}
                />
                <h5 className="text-[20px] font-Poppins">
                  {
                    courseRating
                  }
                  {' '}  Course Rating + {course?.reviews?.length} Reviews
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
