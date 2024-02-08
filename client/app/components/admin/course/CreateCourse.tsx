"use client"
import React, { useState } from 'react'
import { CourseInformation, CourseOptions } from '.'

type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState(0)
    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }])
    const [courseData, setCourseData] = useState({})
    const [courseContentData, setCourseContentData] = useState({
        videoUrl: "",
        title: "",
        description: "",
        videoSection: "Untitled Section",
        links: [
            {
                title: "",
                url: ''
            }
        ],
        suggestions: ""
    })

    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        price: "",
        estimatedPrice: "",
        tags: "",
        levels: "",
        demoUrl: "",
        thumbnail: ""
    })

    return (
        <div className='w-full'>
            <div className="w-[80%]">
                {
                    active === 0 && <CourseInformation />
                }
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed top-18 right-0 z-[-1]">
                <CourseOptions active={active} setActive={setActive}/>
            </div>
        </div>
    )
}

export default CreateCourse