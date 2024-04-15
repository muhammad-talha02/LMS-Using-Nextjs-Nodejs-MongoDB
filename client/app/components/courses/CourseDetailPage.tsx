import Heading from '@/app/utils/Heading'
import { useGetCourseDetailQuery } from '@/redux/features/courses/coursesApi'
import React, { FC, useState } from 'react'
import Header from '../Header'
import Footer from '../Footer'
import CourseDetail from './CourseDetail'

type Props = {
    courseId: string
}

const CourseDetailPage: FC<Props> = ({ courseId }) => {
    const [route, setRoute] = useState("Login")
    const [open, setOpen] = useState(false)
    const { data, isLoading } = useGetCourseDetailQuery(courseId, { skip: !courseId })
    return (
        <>
            <Heading
                title={data?.course.name + " - Compile Academy"}
                description="Compile academy is a platform for students to learn and enhance skills."
                keywords={data?.course.tags}
            />
            <Header open={open} setOpen={setOpen} activeItem={1} setRoute={setRoute} route={route} />
            <CourseDetail course={data?.course}/>
            <Footer />
        </>
    )
}

export default CourseDetailPage