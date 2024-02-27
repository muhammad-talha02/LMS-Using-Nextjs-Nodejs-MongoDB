import React, { FC } from 'react'
import { CourseData, CoursePlayer } from '.'
import { Button, Grid, Rating } from '@mui/material'
import { InputField } from '../../form'

type Props = {

    active: number,
    setActive: (active: number) => void,
    courseData: any,
    handleCourseCreate: any
}


const CoursePreview: FC<Props> = (props) => {

    const { active, setActive, courseData, handleCourseCreate } = props

    const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100
    const disocuntPercentagePrice = discountPercentage.toFixed(0)
    return (
        <div className='w-[90%] m-auto py-5 mb-5'>
            <div className="w-full relative ">
                <div className="w-full mt-10">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}
                    />
                </div>
                <div className="flex items-center">
                    <h1 className="pt-5 text-[21px]">
                        {courseData?.price === 0 ? "Free" : courseData.price + '$'}
                    </h1>
                    <h1 className="pl-3 text-[19px] line-through">
                        {courseData?.estimatedPrice}$
                    </h1>
                    <h1 className="pl-5 pt-4 text-[21px]">
                        {disocuntPercentagePrice}%
                    </h1>
                </div>
                <div className="w-full my-3">
                    <Button variant='contained' sx={{ borderRadius: "20px" }} className='cursor-not-allowed !capitalize !bg-[crimson]'>Buy Now {courseData.price}$</Button>
                </div>
                <Grid container gap={2} alignItems={"center"}>
                    <InputField
                        type={"text"}
                        placeholder="Discount code ..."
                        style={{ xs: 8, md: 6 }}
                    />
                    <Grid item xs={5}>
                        <Button className='!rounded-2xl !capitalize' variant='contained'>Apply</Button>
                    </Grid>
                </Grid>
                <p className='py-1 mt-2'>Source Code Included</p>
                <p className='py-1'>Full Lifetime Access</p>
                <p className='py-1'>Certificate of Completion</p>
                <p className='py-1'>Premium Support</p>
                <div className="w-full">
                    <div className="w-full 800px:pr-5">
                        <h1 className='text-[25px] font-Poppins font-[600]'>
                            {courseData?.name}
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <Rating value={3} className=""/>
                                <h5>0 Reviews</h5>
                            </div>
                            <h5>0 Student</h5>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CoursePreview