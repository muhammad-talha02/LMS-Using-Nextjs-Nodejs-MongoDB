import React, { FC, useState } from "react";
import { CoursePlayer } from "../admin/course";
import { styles } from "@/app/styles/style";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type Props = {
  courseContentData: any;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  courseId: string;
};
const tabsData = [
  { id: 1, label: "Overview" },
  { id: 2, label: "Resources" },
  { id: 3, label: "Q&A" },
  { id: 4, label: "Reviews" },
];

const CourseContentMedia: FC<Props> = (props) => {
  const { courseContentData, activeVideo, setActiveVideo, courseId } = props;

  const [activeTab, setActiveTab] = useState(1);

  const courseResources = courseContentData[activeVideo].links
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      <CoursePlayer videoUrl={courseContentData[activeVideo]?.videoUrl} />
      <div className="w-full flex items-center justify-between my-3">
        <button
          className={`${styles.button} !w-[unset] !py-[unset] rounded-md ${
            activeVideo === 0 && "!cursor-not-allowed opacity-[0.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" size={20} />
          <span>Prev Lesson</span>
        </button>
        <button
          className={`${styles.button} !w-[unset] !py-[unset] rounded-md ${
            courseContentData?.length - 1 === activeVideo &&
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
          <span>Prev Lesson</span>
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
              className={`800px:text-[20px] cursor-pointer ${
                activeTab === tab.id && "text-[--t-red] dark:text-[--t-blue]"
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
       {
           activeTab === 1 && <p>{courseContentData?.[activeVideo].description}</p>
        }
        {/* Tab # 2 */}
        {
            activeTab === 2 && <div>
                {
                    courseResources?.map((link:any, index:number)=>{
return <div className="mb-5" key={link.title}>
<h2 className="800px:text-[20px] 800px:inline-block">
    {link.title && link.title + ": "}
</h2>
    <a href={link.url} className="pl-2 text-[--t-blue]">{link.url}</a>
</div>
                    })
                }
            </div>
        }
    </div>
  );
};

export default CourseContentMedia;
