import { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

type Props = {
  courseData: any;
  activeVideo?: any;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = (props) => {
  const { courseData, isDemo, activeVideo, setActiveVideo } = props;
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set<string>()
  );

  //? Find Unique Video Sections
  const videoSections: string[] = [
    ...new Set<string>(courseData?.map((item: any) => item.videoSection)),
  ];
  let totalCount: number = 0; //? Total No of Videos from Previous Section

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSections);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }

    setVisibleSections(newVisibleSections);
  };

  return (
    <div
      className={`w-full mt-4 ${
        !isDemo && "ml-[-30px] sticky top-24 left-0 z-30"
      }`}
    >
      {videoSections.map((section: string, index: number) => {
        const isSectionVisible = visibleSections.has(section);

        // filter videos by section

        const sectionVideos: any[] = courseData.filter((item: any) => {
         return item.videoSection === section;
        });
        console.log("section" , sectionVideos)

        const sectionVideoCount: number = sectionVideos.length;
        const sectionVideoLength: number = sectionVideos.reduce(
          (totalLength: number, item: any) => totalLength + item.videoLength,
          0
        );

        const sectionStartIndex: number = totalCount;
        totalCount += sectionVideoCount;

        const sectionContentHours: number = sectionVideoLength / 60;
        return (
          <>
            <div
              className={`${!isDemo && "border-b border-[#fffffe8] pb-2"}`}
              key={section}
            >
              <div className="w-full flex">
                {/* Render VideoSection  */}
                <div className="w-full flex items-center justify-between">
                  <h2 className="text-[22px]">{section}</h2>
                  <button
                    className="mr-4 cursor-pointer"
                    onClick={() => toggleSection(section)}
                  >
                    {isSectionVisible ? (
                      <BsChevronUp size={20} />
                    ) : (
                      <BsChevronDown size={20} />
                    )}
                  </button>
                </div>
              </div>
              <h5 className="">
                {sectionVideoCount} Lessons {' '}
                {sectionVideoLength < 60
                  ? sectionVideoLength
                  : sectionContentHours.toFixed(2)}{' '}
                {sectionVideoLength > 60 ? "Hours" : "minutes"}
              </h5>
              <br />
              {isSectionVisible && (
                <div className="w-full">
                  {sectionVideos.map((video: any, index: number) => {
                    const videoIndex: number = sectionStartIndex + index;
                    const contentLength = video.videoLength / 60;
                    return (
                      <>
                        <div
                          className={`w-full ${
                            videoIndex === activeVideo ? "bg-slate-800" : ""
                          } cursor-pointer transition-all p-2`}
                          onClick={() => {
                            isDemo ? null : setActiveVideo(videoIndex);
                          }}
                        >
                          <div className="flex items-center">
                            <div>
                              <MdOutlineOndemandVideo
                                size={25}
                                className="mr-2"
                                color="#1cdada"
                              />
                            </div>
                            <h1 className="text-[18px] break-words inline-block">
                              {video.title}
                            </h1>
                          </div>
                          <h5 className="pl-8">
                            {video.videoLength > 60
                              ? contentLength.toFixed(2)
                              : video.videoLength}
                            {video.videoLength > 60 ? "hours" : "minutes"}
                          </h5>
                        </div>
                      </>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default CourseContentList;
