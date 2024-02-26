import React, { FC } from 'react'
import { CoursePlayer } from '.'

type Props = {

    active:number,
    setActive:(active:number)=> void,
    courseData:any,
    handleCourseCreate:any
}

const CoursePreview:FC<Props> = (props) => {

    const {active, setActive, courseData, handleCourseCreate}= props
  return (
    <div className='w-[90%] m-auto py-5 mb-5'>
        <div className="w-full relative">
            <div className="w-full mt-10">
                <CoursePlayer
                videoUrl={courseData?.demoUrl}
                title={courseData?.title}
                />
            </div>
        </div>
    </div>
  )
}

export default CoursePreview