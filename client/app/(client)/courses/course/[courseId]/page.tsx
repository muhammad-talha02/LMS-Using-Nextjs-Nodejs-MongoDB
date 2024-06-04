"use client"
import CourseDetailPage from '@/app/components/courses/CourseDetailPage'
import React, { FC } from 'react'

const SingleCoursePage = ({params}:any) => {
    return (
        <>
            <CourseDetailPage courseId={params.courseId}/>
        </>)
}

export default SingleCoursePage