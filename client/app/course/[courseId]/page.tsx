"use client"
import CourseDetailPage from '@/app/components/courses/CourseDetailPage'
import React, { FC } from 'react'

const SingleCoursePage = ({params}:any) => {
    console.log("params", params)
    return (
        <>
            <CourseDetailPage courseId={params.courseId}/>
        </>)
}

export default SingleCoursePage