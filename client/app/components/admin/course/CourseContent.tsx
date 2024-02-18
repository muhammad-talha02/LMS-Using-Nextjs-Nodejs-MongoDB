"use client"
import { styles } from '@/app/styles/style'
import React, { FC, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsPencil } from 'react-icons/bs'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

type Props = {
    courseContentData: any,
    setCourseContentData: (courseContentData: any) => void,
    active: number,
    setActive: (active: number) => void
}


const CourseContent: FC<Props> = (props) => {

    const { courseContentData, setCourseContentData, active, setActive } = props

    const [isCollapsed, setIsCollapsed] = useState(Array(courseContentData.length).fill(false))
    const [activeSection, setActiveSection] = useState(1)


    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    const handleCollapsesToggle = (index: number) => {
        const updatedCollpased = [...isCollapsed]
        updatedCollpased[index] = !updatedCollpased[index]
        setIsCollapsed(updatedCollpased)
    }
    return (
        <div className='w-[80%] mt-12 pt-3 m-auto'>
            <form onSubmit={handleSubmit}>
                {
                    courseContentData?.map((item: any, index: number) => {

                        const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection
                        return (
                            <>
                                <div className={`w-full bg-[#cbc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>


                                    {
                                        showSectionInput && <div className='flex w-full items-center '>

                                            <input type="text" value={item.videoSection} className={`text-[20px] ${item.videoSection === "Untitled Section"} ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer bg-transparent text-black dark:text-white outline-none`}
                                                onChange={(e: any) => {
                                                    const updatedCourseContentData = [...courseContentData]
                                                    updatedCourseContentData[index] = e.target.value;
                                                    setCourseContentData(updatedCourseContentData)
                                                }}
                                            />
                                            <BsPencil className='cursor-pointer'/>
                                        </div>
                                    }
                                    <div className="flex w-full items-center justify-between my-0">
                                        {
                                            isCollapsed[index] ?( <>
                                                {
                                                    item?.title ? <p className='font-Poppins dark:text-white text-black'>
                                                        {index + 1}. {item.title}
                                                    </p> : <></>
                                                }
                                            </>) : (<div>
                                            </div>)
                                        }


                                        {/* Arroe Button for video collapse  */}
                                        <div className="flex items-center">
                                            <AiOutlineDelete
                                                className={`dark:text-white text-[20px] mr-2 text-black ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}

                                                onClick={() => {
                                                    if (index > 0) {
                                                        const updatedData = [...courseContentData];
                                                        updatedData.splice(index, 1)

                                                        setCourseContentData(updatedData)
                                                    }
                                                }}
                                            />
                                            <MdOutlineKeyboardArrowDown
                                                fontSize={"large"}
                                                className={` dark:text-white text-black`}
                                                style={{
                                                    transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)"
                                                }}
                                                onClick={() => handleCollapsesToggle(index)}
                                            />
                                        </div>
                                    </div>
                                    {
                                        isCollapsed[index] && <>
                                            <div className="my-3">

                                                <label htmlFor="" className={styles.label}>Video Title</label>
                                            </div>
                                        </>
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default CourseContent