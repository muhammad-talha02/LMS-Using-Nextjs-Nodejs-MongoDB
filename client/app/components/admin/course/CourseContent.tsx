"use client";
import { styles } from "@/app/styles/style";
import React, { ChangeEvent, FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BsLink45Deg, BsPencil } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { InputField } from "../../form";
import { AddCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import toast from "react-hot-toast";
import { NextButton } from ".";

type Props = {
    courseContentData: any;
    setCourseContentData: (courseContentData: any) => void;
    active: number;
    setActive: (active: number) => void;
};

const CourseContent: FC<Props> = (props) => {
    const { courseContentData, setCourseContentData, active, setActive } = props;
    const [isCollapsed, setIsCollapsed] = useState(
        Array(courseContentData.length).fill(false)
        );
        const [activeSection, setActiveSection] = useState(1);
        
        const handleSubmit = (e: any) => {
            e.preventDefault();
        };
        
        const handleCollapsesToggle = (index: number) => {
            const updatedCollpased = [...isCollapsed];
            console.log("Collapsed", updatedCollpased);
        updatedCollpased[index] = !updatedCollpased[index];
        setIsCollapsed(updatedCollpased);
    };
    const handleRemoveLink = (index: number, linkIndex: number) => {
        const updatedCourseContentData = [...courseContentData];
        updatedCourseContentData[index].links.splice(linkIndex, 1);
        setCourseContentData(updatedCourseContentData);
    };

    const newContentHandler = (item: any) => {
        if (item.title === '' || item.description === '' || item.videoUrl === '' || item.links[0].title === '' || item.links[0].url === '') {
            toast.error("Please fill all required fields first")
        }
        else {
            let newVideoSection = ''
            if (courseContentData.length > 0) {
                const lastVideoSection = courseContentData[courseContentData.length - 1].videoSection

                // use tha last video section  if available else use user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection
                }
            }
            const newContent = {
                videoUrl: '',
                title: "",
                videoSection: newVideoSection,
                description: "",
                links: [{ title: "", url: "" }]
            }
            setCourseContentData([...courseContentData, newContent])
        }
    }

    const addNewSection = () => {
        const lastCourseContentData = courseContentData[courseContentData.length - 1]
        const checkLastisFilled = new Set(Object.values(lastCourseContentData)).has("") || lastCourseContentData.links.some((link: any) => new Set(Object.values(link)).has(""))
        if (checkLastisFilled) {
            toast.error("Please fill all above fields!")
        }
        else{
            setActiveSection(activeSection + 1)
            const newContent = {
                videoUrl: '',
                title: "",
                videoSection: `Untitle Section ${activeSection}`,
                description: "",
                links: [{ title: "", url: "" }]
            }
            setCourseContentData([...courseContentData, newContent])
        }

    }

const handleNext = ()=>{
    const lastCourseContentData = courseContentData[courseContentData.length - 1]
    const checkLastisFilled = new Set(Object.values(lastCourseContentData)).has("") || lastCourseContentData.links.some((link: any) => new Set(Object.values(link)).has(""))
    if (checkLastisFilled) {
        toast.error("Section Can't be Empty!")
    }
    else{
        setActive(active + 1)
        // handleSubmit()
    }
}

    return (
        <div className="w-[80%] mt-12 pt-3 m-auto">
            <form onSubmit={handleSubmit}>
                {courseContentData?.map((item: any, index: number) => {
                    const showSectionInput =
                        index === 0 ||
                        item.videoSection !== courseContentData[index - 1].videoSection;
                    return (
                        <>
                            <div
                                className={`w-full bg-[#cbc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"
                                    }`}
                            >
                                {showSectionInput && (
                                    <div className="flex w-full items-center ">
                                        <input
                                            type="text"
                                            value={item.videoSection}
                                            className={`text-[20px] ${item.videoSection === "Untitled Section"
                                                } ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer bg-transparent text-black dark:text-white outline-none`}
                                            onChange={(e: any) => {
                                                const updatedCourseContentData = [...courseContentData];
                                                updatedCourseContentData[index].videoSection =
                                                    e.target.value;
                                                setCourseContentData(updatedCourseContentData);
                                            }}
                                        />
                                        <BsPencil className="cursor-pointer" />
                                    </div>
                                )}
                                <div className="flex w-full items-center justify-between my-0">
                                    {/* {isCollapsed[index] ? ( */}
                                        <div>
                                            {item?.title ? (
                                                <p className="font-Poppins dark:text-white text-black">
                                                    {index + 1}. {item.title}
                                                </p>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    {/* ) : (
                                        <div></div>
                                    )} */}

                                    {/* Arroe Button for video collapse  */}
                                    <div className="flex items-center">
                                        <AiOutlineDelete
                                            className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"
                                                }`}
                                            onClick={() => {
                                                if (index > 0) {
                                                    const updatedData = [...courseContentData];
                                                    updatedData.splice(index, 1);

                                                    setCourseContentData(updatedData);
                                                }
                                            }}
                                        />
                                        <MdOutlineKeyboardArrowDown
                                            fontSize={"large"}
                                            className={` dark:text-white text-black`}
                                            style={{
                                                transform: isCollapsed[index]
                                                    ? "rotate(180deg)"
                                                    : "rotate(0deg)",
                                            }}
                                            onClick={() => handleCollapsesToggle(index)}
                                        />
                                    </div>
                                </div>
                                {isCollapsed[index] && (
                                    <>
                                        <div className="my-3">
                                            {/* <label htmlFor="" className={styles.label}>Video Title</label> */}
                                            <InputField
                                                type={"text"}
                                                style={{ lg: 12, md: 12 }}
                                                labelStyle={styles.label}
                                                label="Video Title"
                                                value={item.title}
                                                // value={courseContentData[index].title}
                                                placeholder="Project Plan.."
                                                name="title"
                                                id="title"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    const updatedCourseContentData = [
                                                        ...courseContentData,
                                                    ];
                                                    updatedCourseContentData[index].title =
                                                        e.target.value;
                                                    setCourseContentData(updatedCourseContentData);
                                                }}
                                            />
                                        </div>
                                        <div className="my-3">
                                            {/* <label htmlFor="" className={styles.label}>Video Title</label> */}
                                            <InputField
                                                type={"text"}
                                                style={{ lg: 12, md: 12 }}
                                                labelStyle={styles.label}
                                                label="Video Url"
                                                value={courseContentData[index].videoUrl}
                                                placeholder="www.video.com.."
                                                name="videourl"
                                                id="videourl"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                                    const updatedCourseContentData = [
                                                        ...courseContentData,
                                                    ];
                                                    updatedCourseContentData[index].videoUrl =
                                                        e.target.value;
                                                    setCourseContentData(updatedCourseContentData);
                                                }}
                                            />
                                        </div>
                                        <div className="my-3">
                                            <label htmlFor="description" className={styles.label}>
                                                Video Description
                                            </label>
                                            <textarea
                                                rows={8}
                                                value={item.description}
                                                placeholder="Wrote something...."
                                                name="description"
                                                id="description"
                                                className={`${styles.input} !h-auto`}
                                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                                    const updatedCourseContentData = [
                                                        ...courseContentData,
                                                    ];
                                                    updatedCourseContentData[index].description =
                                                        e.target.value;
                                                    setCourseContentData(updatedCourseContentData);
                                                }}
                                            />
                                        </div>
                                        {/* Links  */}
                                        <Box>

                                            {item.links?.map((link: any, linkIndex: number) => {
                                                return (
                                                    <div className="my-3" key={linkIndex}>
                                                        <>
                                                            <div className="w-full flex items-center justify-between">
                                                                <label htmlFor="" className={styles.label}>
                                                                    Link {linkIndex + 1}
                                                                </label>
                                                                <AiOutlineDelete
                                                                    className={`${linkIndex === 0
                                                                        ? "cursor-no-drop"
                                                                        : "cursor-pointer"
                                                                        }`}
                                                                    onClick={() => {
                                                                        linkIndex === 0
                                                                            ? null
                                                                            : handleRemoveLink(index, linkIndex);
                                                                    }}
                                                                />
                                                            </div>
                                                            <InputField
                                                                type={"text"}
                                                                style={{ lg: 12, md: 12 }}
                                                                labelStyle={styles.label}
                                                                // label="Source Code Title"
                                                                value={link.title}
                                                                placeholder="Source code title.."
                                                                name="videourl"
                                                                id="videourl"
                                                                classes={"!mb-2"}
                                                                onChange={(
                                                                    e: ChangeEvent<HTMLInputElement>
                                                                ) => {
                                                                    const updatedCourseContentData = [
                                                                        ...courseContentData,
                                                                    ];
                                                                    updatedCourseContentData[index].links[
                                                                        linkIndex
                                                                    ].title = e.target.value;
                                                                    setCourseContentData(
                                                                        updatedCourseContentData
                                                                    );
                                                                }}
                                                            />
                                                            <InputField
                                                                type={"text"}
                                                                style={{ lg: 12, md: 12 }}
                                                                labelStyle={styles.label}
                                                                // label="Source Code Link"
                                                                value={link.url}
                                                                placeholder="Source code Link.."
                                                                name="videourl"
                                                                id="videourl"
                                                                onChange={(
                                                                    e: ChangeEvent<HTMLInputElement>
                                                                ) => {
                                                                    const updatedCourseContentData = [
                                                                        ...courseContentData,
                                                                    ];
                                                                    updatedCourseContentData[index].links[
                                                                        linkIndex
                                                                    ].url = e.target.value;
                                                                    setCourseContentData(
                                                                        updatedCourseContentData
                                                                    );
                                                                }}
                                                            />
                                                        </>
                                                    </div>
                                                );
                                            })}
                                            <Box
                                                display={"flex"}
                                                className="cursor-pointer"
                                                gap={1}
                                                alignItems={"center"}
                                                onClick={() => {
                                                    const updatedCourseContentData = [
                                                        ...courseContentData,
                                                    ];
                                                    updatedCourseContentData[index].links.push({
                                                        title: "",
                                                        url: "",
                                                    });
                                                    setCourseContentData(updatedCourseContentData);
                                                }}
                                            >
                                                <BsLink45Deg />
                                                <span>Add Link</span>
                                            </Box>
                                        </Box>
                                    </>
                                )}

                                <br />

                                {/* Add new Content  */}

                                {
                                    index === courseContentData.length - 1 && (
                                        <div className="flex items-center text-[18px] cursor-pointer"
                                            onClick={() => newContentHandler(item)}
                                        >
                                            <AiOutlinePlusCircle className="mr-2" />
                                            <p>Add New Content</p>
                                        </div>
                                    )
                                }
                            </div>
                        </>
                    );
                })}
                <br />
                {/* Add New Section  */}
                <div className="flex items-center cursor-pointer text-[20px]" onClick={addNewSection}>
                 <AiOutlinePlusCircle className="mr-2"/>   Add new Section
                </div>
            </form>
            <NextButton prevTitle="Previous" nextTitle="Next" handlePrev={()=> setActive(active - 1)}/>
        </div>
    );
};

export default CourseContent;
