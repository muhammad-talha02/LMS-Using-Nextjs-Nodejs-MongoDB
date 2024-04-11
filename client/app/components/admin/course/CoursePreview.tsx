import React, { FC } from 'react'
import { CourseData, CoursePlayer, NextButton } from '.'
import { Button, Grid, Rating } from '@mui/material'
import { InputField } from '../../form'
import { StarBorder } from '@mui/icons-material'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { MdVerified } from "react-icons/md";

type Props = {

    active: number,
    setActive: (active: number) => void,
    courseData: any,
    isLoading?: boolean,
    handleCourseCreate: any,
    isUpdate?: boolean
}

const CoursePreview: FC<Props> = (props) => {

    const { active, setActive, courseData, handleCourseCreate, isUpdate, isLoading } = props

    const discountPercentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100
    const disocuntPercentagePrice = discountPercentage.toFixed(0)
    const createCourse = () => {
        handleCourseCreate()
    }
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
                    {
                        courseData?.estimatedPrice && courseData?.estimatedPrice !== courseData?.price &&
                        <>
                            <h1 className="pl-3 text-[19px] line-through">
                                {courseData?.estimatedPrice}$
                            </h1>
                            <h1 className="pl-5 pt-4 text-[20px]">
                                {disocuntPercentagePrice}% off
                            </h1>
                        </>
                    }
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
                        <Button className='!rounded-xl !capitalize' variant='contained'>Apply</Button>
                    </Grid>
                </Grid>
                <div className='flex items-center gap-2 my-1 mt-5'>
                    <MdVerified />
                    <p className=''> Source Code Included</p>
                </div>
                <div className='flex items-center gap-2 my-1'>
                    <MdVerified />
                    <p className=''>Full Lifetime Access</p>
                </div>
                <div className='flex items-center gap-2 my-1'>
                    <MdVerified />
                    <p className=''>Certificate of Completion</p>
                </div>
                <div className='flex items-center gap-2 my-1'>
                    <MdVerified />
                    <p className=''> Premium Support</p>
                </div>

                <div className="w-full">
                    <div className="w-full 800px:pr-5">
                        <h1 className='text-[25px] font-Poppins font-[600]'>
                            {courseData?.name}
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center gap-3">
                                <Rating defaultValue={0} precision={0.5} emptyIcon={<StarBorder className='text-[orange]' />} readOnly />
                                <h5>0 Reviews</h5>
                            </div>
                            <h5>0 Student</h5>
                        </div>
                    </div>

                </div>
                <h1 className='text-[22px] font-Poppins font-semibold mt-3'>What will you learn from this course?</h1>
                {
                    courseData?.benefits?.map((benefit: any) => (
                        <div className="w-full flex items-center py-2" key={benefit.title}>
                            <div className="w-[15px] mr-3">
                                <IoCheckmarkDoneOutline size={20} />
                            </div>
                            <p className='pl-1'>{benefit.title}</p>
                        </div>
                    )

                    )
                }
                <h1 className='text-[22px] font-Poppins font-semibold mt-3'>What are the prerequsities to start this course?</h1>
                {
                    courseData?.prequesities?.map((prerequisite: any) => (
                        <div className="w-full flex items-center py-2" key={prerequisite.title}>
                            <div className="w-[15px] mr-3">
                                <IoCheckmarkDoneOutline size={20} />
                            </div>
                            <p className='pl-1'>{prerequisite.title}</p>
                        </div>
                    )

                    )
                }

                {/* course Details  */}
                <div className="w-full">
                    <h1 className='text-[24px] font-Poppins font-600'>Course Details</h1>
                    <p>{courseData?.description}</p>
                </div>
            </div>
            <NextButton prevTitle='Previous' handlePrev={() => setActive(active - 1)} isLoading={isLoading} handleNext={createCourse} nextTitle={isUpdate ? "Update" : 'Publish'} />
        </div>
    )
}

export default CoursePreview