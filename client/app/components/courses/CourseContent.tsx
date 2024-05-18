import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi'
import React from 'react'

type Props = {
    courseId: string
}

const CourseContent = ({ courseId }: Props) => {
    const { data: courseData, isLoading, error, isSuccess } = useGetCourseContentQuery(courseId)
    return (
        <div>CourseContent</div>
    )
}

export default CourseContent