"use client"
import React, { FC, useState } from 'react'

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
    return (
        <div className='w-[80%] mt-12 pt-3 m-auto'>
            <form>
                {
                    courseContentData?.map((item: any, index: number) => {

                        const showSectionInput = index === 0 || item.videoSection !== courseContentData[index - 1].videoSection
                        return (
                            <>
                                <div className={`w-full bg-[#cdCbCB] p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}>

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