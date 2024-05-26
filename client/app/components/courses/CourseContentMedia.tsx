import { styles } from "@/app/styles/style";
import { FC, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { CoursePlayer } from "../admin/course";
import QuestionsAnswersTab, {
  CoureseResources,
  CourseReviewForm,
  QuestionReply,
} from "./CourseTabs";
import useMutation from "@/app/_hooks/useMutation";
import {
  useAddAnswerMutation,
  useAddCourseReviewMutation,
  useGetCourseDetailQuery,
} from "@/redux/features/courses/coursesApi";
import toast from "react-hot-toast";
import { CourseReviews } from "./CourseViewComponents";

type Props = {
  courseContentData: any;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  courseId: string;
  user: any;
  refetchCourseContent: () => void;
};
const tabsData = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Resources" },
  { id: 3, label: "Q&A" },
  { id: 4, label: "Reviews" },
];

const CourseContentMedia: FC<Props> = (props) => {
  const {
    courseContentData,
    activeVideo,
    setActiveVideo,
    courseId,
    user,
    refetchCourseContent,
  } = props;

  const [activeTab, setActiveTab] = useState(1);
  const id = courseId
  //? Get Single Course
  const { data: courseData, refetch:refetchCourse } = useGetCourseDetailQuery(id)

  //? Api - add Answer to Question
  const { actionApi: addAnswerAction, result: ResultAnswer } = useMutation({
    api: useAddAnswerMutation,
    successMsg: "Answer Added Successfully",
  });

  //? Api - add Review in Course
  const { actionApi: addReviewAction, result: ResultReview } = useMutation({
    api: useAddCourseReviewMutation,
    successMsg: "Review Added Successfully",
    successFunc() {
      refetchCourse();
    },
  });
  const courseResources = courseContentData?.[activeVideo].links;
  const isUserReviewExist = courseData && courseData?.course?.reviews?.find(
    (item: any) => item?.user?._id === user?._id
  );
  console.log("review", isUserReviewExist)

  //* handle Answer Submit
  const handleAnswerSubmit = async (questionId: any, answer: string) => {
    if (answer.length === 0) {
      toast.error("Question can't be empty ");
    } else {
      let obj = {
        answer,
        courseId,
        questionId,
        contentId: courseContentData?.[activeVideo]?._id,
      };
      await addAnswerAction(obj);
    }
  };

  //* handle Review Submit

  const handleReviewSubmit = async (review: string, rating: number) => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      const obj = {
        id: courseId,
        data: { review, rating },
      };
      await addReviewAction(obj);
    }
  };
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer videoUrl={courseContentData[activeVideo]?.videoUrl} />
      <div className="w-full flex items-center justify-between my-3">
        <button
          className={`${styles.button} !w-[unset] !py-[unset] rounded-md ${activeVideo === 0 && "!cursor-not-allowed opacity-[0.8]"
            }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" size={20} />
          <span>Prev Lesson</span>
        </button>
        <button
          className={`${styles.button} !w-[unset] !py-[unset] rounded-md ${courseContentData?.length - 1 === activeVideo &&
            "!cursor-not-allowed opacity-[0.8]"
            }`}
          onClick={() =>
            setActiveVideo(
              courseContentData && courseContentData?.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          <span>Next Lesson</span>
          <AiOutlineArrowRight className="mr-2" size={20} />
        </button>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">
        {courseContentData[activeVideo]?.title}
      </h1>
      {/* Tabs Data of Course  */}
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
        {tabsData?.map((tab: any, index: number) => {
          return (
            <h5
              key={tab.id}
              className={`800px:text-[20px] cursor-pointer ${activeTab === tab.id && "text-[--t-red] dark:text-[--t-blue]"
                }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </h5>
          );
        })}
      </div>
      <br />

      {/* Tab # 1 */}
      {activeTab === 1 && <p>{courseContentData?.[activeVideo].description}</p>}
      {/* Tab # 2 */}
      {activeTab === 2 && (
        <CoureseResources courseResources={courseResources} />
      )}

      {/* Tab # 3  */}
      {activeTab === 3 && (
        <>
          <QuestionsAnswersTab
            user={user}
            courseId={courseId}
            activeVideo={courseContentData?.[activeVideo]}
          />
          <QuestionReply
            courseContentData={courseContentData}
            activeVideo={activeVideo}
            // answer={answer}
            // setAnswer={setAnswer}
            user={user}
            handleAnswerSubmit={handleAnswerSubmit}
            ResultAnswer={ResultAnswer}
          />
        </>
      )}

      {/* Tab # 4  */}
      {activeTab === 4 && <>
        {!isUserReviewExist && <CourseReviewForm user={user} handleReviewSubmit={handleReviewSubmit} ResultReview={ResultReview} />}
        <hr className="mt-5"/>
        {
          courseData?.course?.reviews?.map((review: any, index: number) => (
            <CourseReviews key={review._id} review={review} />
          ))
        }
      </>
      }
    </div>
  );
};

export default CourseContentMedia;
