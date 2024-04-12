import { useGetAllCoursesForWebisteQuery } from '@/redux/features/courses/coursesApi'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CourseCard from './CourseCard'
import Loader from '../Loader/Loader'

type Props = {}

const Courses = (props: Props) => {
    const [courses, setCourses] = useState<any[]>([])
    const { data , isLoading} = useGetAllCoursesForWebisteQuery({})

    useEffect(() => {
        if (data) {
            setCourses(data.courses)
        }
    }, [data])
    if(isLoading) return <Loader/>
    return (
        <div className='bg-[--t-light-blu] my-3'>
            <div className="w-[90%] 800px:w-[80%] m-auto">
                <h1 className='text-center mb-3 font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:tex-4xl dark:text-white 800px:!leading-[45px] text-black font-[700] tracking-tight'>Expand Your Career
                    <span className='text-[--t-red] dark:text-[--t-blue]'> Opportunity</span> <br />
                    with our <span className='text-[--t-red] dark:text-[--t-blue]'>Courses</span>
                </h1>
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 1500px:grid-cols-3 1500px:gap-[30px]'>
                    {
                        courses?.map((course: any, index: number) => (
                        <>
                            <CourseCard item={course} key={index} />
                            <CourseCard item={course} key={index} />
                        </>
                        ))
                    }
                </div>
               
            </div>
        </div>
    )
}

export default Courses