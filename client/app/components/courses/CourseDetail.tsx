import { StarBorder } from "@mui/icons-material";
import { Rating } from "@mui/material";
import React, { FC } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { CourseBenefits, CourseReviews } from "./CourseViewComponents";
import { CoursePlayer } from "../admin/course";
import Link from "next/link";
import { styles } from "@/app/styles/style";
import CourseContentList from "./CourseContentList";

type Props = {
  course: any;
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

  const reviews = course?.reviews.reverse()
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
                <h5>{reviews?.length} Reviews</h5>
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
            <div>
              <h1 className="text-[28px] font-semibold">Couse Overview</h1>
              <CourseContentList courseData={course?.courseData} isDemo={true}/>
            </div>
            <div className="w-full">
              {/* Course Rating * {course?.reviews?.length} Reviews */}
              <h1 className="text-[25px] font-semibold">Couse Details</h1>
              <p className="mt-5 text-[18px] w-full overflow-hidden whitespace-pre-line">
                {course?.description}
              </p>
            </div>
            {/* Reviews Section  */}
            <div className="w-full">
              <div className="800px:flex block item-center gap-2">
                <Rating
                  value={3.5}
                  precision={0.5}
                  emptyIcon={<StarBorder className="text-[orange]" />}
                />
                <h5 className="text-[20px] font-Poppins">
                  {
                    courseRating
                  }
                  {' '}  Course Rating + {reviews?.length || 0} Reviews
                </h5>
              </div>
              {/* Reviews  */}

            </div>
            <div className="800px:flex">
              {
                reviews?.map((review: any, index: number) => (
                  <CourseReviews key={review._id} review={review} />
                ))
              }

            </div>
            <br />
          </div>

          {/* Course Demo Video  */}
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
              <CoursePlayer videoUrl={course?.demoUrl} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[18px]">
                  {course?.price === 0 ? "Free" : course.price + '$'}
                </h1>
                {
                  course?.estimatedPrice && course?.estimatedPrice !== course?.price &&
                  <>
                    <h4 className="pl-3 text-[17px] line-through">
                      {course?.estimatedPrice}$
                    </h4>
                    <h4 className="pl-5 pt-4 text-[18px]">
                      {discountPercentagePrice}% off
                    </h4>
                  </>
                }
              </div>
              <div className="flex items-center">
                {
                  !isPurchased && !(course?.price === 0) ?
                    <button className={`${styles.button} rounded-xl !w-[180px] !text-white my-3 font-Poppins cursor-pointer !bg-[--t-red] dark:!bg-[--t-blue]`}>
                      Buy Now {course?.price}$
                    </button> :
                    <Link href={`course-access/${course?._id}`} className={`${styles.button} !text-white rounded-xl !w-[180px] my-3 font-Poppins cursor-pointer !bg-[--t-red] dark:!bg-[--t-blue]`}>
                      Enter to Course
                    </Link>
                }
              </div>
              <br />
              <li>Source Code included</li>
              <li>Full lifetimee access</li>
              <li>Certificate of Completion</li>
              <li>Premium Support</li>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetail;
