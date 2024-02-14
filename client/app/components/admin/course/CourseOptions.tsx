import React, { FC } from 'react'
import { IoMdCheckmark } from 'react-icons/io'

type Props = {
    active: number,
    setActive: (active: number) => void
}

const CourseOptions: FC<Props> = ({ active, setActive }) => {

    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
    return (
        <div>
            {
                options?.map((option: string, index: number) => (
                    <div key={index} className='w-full flex py-5'>
                        <div className={`w-[35px] h-[35px] rounded-full flex items-center justify-center relative ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"}`}>

                            <IoMdCheckmark className='text-[20px]' />
                            {
                                index !== options.length - 1 && (
                                    <div className={`absolute bottom-[-100%] h-[30px] w-1 ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"}`}></div>
                                )
                            }
                        </div>
                        <h5 className={`pl-3 text-[20px] ${active === index && "text-black dark:text-white"}`}>{option}</h5>
                    </div>
                ))
            }
        </div>
    )
}

export default CourseOptions