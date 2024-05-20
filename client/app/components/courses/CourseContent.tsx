import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  courseId: string;
};

const CourseContent = ({ courseId }: Props) => {
  const {
    data: courseData,
    isLoading,
    error,
    isSuccess,
  } = useGetCourseContentQuery(courseId);

  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);

  const courseContentData = courseData?.content;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setRoute={setRoute}
            route={route}
          />
          <div className="w-full grid 800px:grid-cols-10">
            <Heading
              title={courseContentData?.[activeVideo].title}
              description="sdfsfs"
              keywords="dddd"
            />
            <div className="col-span-7">
              <CourseContentMedia
                courseContentData={courseContentData}
                activeVideo={activeVideo}
                courseId={courseId}
                setActiveVideo={setActiveVideo}
              />
            </div>
            <div className="hidden 800px:block 800px:col-span-3">
              <CourseContentList courseData={courseContentData} activeVideo={activeVideo}
                setActiveVideo={setActiveVideo} />

            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CourseContent;
