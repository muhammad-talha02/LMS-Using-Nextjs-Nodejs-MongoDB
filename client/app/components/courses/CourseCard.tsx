import { StarBorder } from '@mui/icons-material'
import { Rating } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import { AiOutlineUnorderedList } from 'react-icons/ai'

type Props = {
    item: any,
    isProfile?: boolean
}

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    const { thumbnail, name, price, estimatedPrice, courseData } = item
    const totalLectures = courseData?.length
    return (
        <Link href={"/"}>
            <div className='w-full min-h-[35vh] dark:bg-slate-800 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] dark:shadow-[bg-slate-700] rounded-lg p-3 shadow-sm dark:shadow-inner'>
                <Image src={thumbnail.url} width={500} height={500} alt='Course-thumbnail' objectFit='contain' className='rounded-lg w-full border border-[#00000015]' />

                <h1 className='text-[16px] font-Poppins mt-2'>{name}</h1>
                <div className="flex justify-between items-center pt-2">
                    <Rating value={3.5} precision={0.5} emptyIcon={<StarBorder className='text-[orange]' />} readOnly />
                    {!isProfile && <h5>0 Student</h5>}
                </div>
                <div className="flex justify-between items-center pt-3">
                <div className="flex">
                    <h3>{price === 0 ? 'Free' : price + '$'}</h3>
                    <h5 className='pl-3 mt-[-5px] line-through opacity-80'>{estimatedPrice}$</h5>
                </div>
                <div className="flex items-center gap-1">
                    <AiOutlineUnorderedList size={20} className='dark:text-white'/>
                    <h5>
                        {totalLectures} Lectures
                    </h5>
                </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard