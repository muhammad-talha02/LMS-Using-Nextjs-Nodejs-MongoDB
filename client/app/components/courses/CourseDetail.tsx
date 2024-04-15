import { StarBorder } from '@mui/icons-material'
import { Rating } from '@mui/material'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

type Props = {
    course: any
}

const CourseDetail: FC<Props> = ({ course }) => {
    const { user } = useSelector((state: any) => state.auth)
    const discountPercentage = ((course?.estimatedPrice - course?.price) / course?.estimatedPrice) * 100
    const discountPercentagePrice = discountPercentage.toFixed(0)
    console.log(discountPercentage, "user")

    const isPurchased = user && user?.courses.find((item: any) => item?._id === course?._id)
    return (
        <div>
            <div className="w-[90%] m-auto py-5">

                <div className="w-full flex flex-col 800px:flex-row">
                    <div className="w-full 800px:w-[65%] 800px:pr-5">
                        <h1 className="text-black dark:text-white text-[25px] font-Poppins font-[600]">
                            {course?.name}
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center gap-2">
                                <Rating value={5} precision={0.5} emptyIcon={<StarBorder className='text-[orange]' />} readOnly />
                                <h5>{course?.reviews?.length} Reviews</h5>
                            </div>
                            <h5>{course?.purchased} Students</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail