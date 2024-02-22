"use client"
import React, { useState } from 'react'
import { CourseContent, CourseData, CourseInformation, CourseOptions } from '.'

type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState(2)
    const [benefits, setBenefits] = useState([{ title: "" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "" }])
    const [courseData, setCourseData] = useState({})
    const [courseContentData, setCourseContentData] = useState([{
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
        // suggestions: ""
    }])

    const [courseInfo, setCourseInfo] = useState({
        name: "k",
        description: "k",
        price: 2,
        estimatedPrice: 1,
        tags: "k",
        levels: "k",
        demoUrl: "k",
        thumbnail: ""
    })

    return (
        <div className='w-full'>
            <div className="w-[80%]">
                {
                    active === 0 && <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                }
                {
                    active === 1 && <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                }
                {
                    active === 2 && <CourseContent
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        active={active}
                        setActive={setActive}
                    />
                }
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed top-12 right-0 z-[-1]">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default CreateCourse