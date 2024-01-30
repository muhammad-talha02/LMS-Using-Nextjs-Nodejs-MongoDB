import React, { FC, useState } from 'react'
import ThemeSwitcher from '../ThemeSwitcher'
import { IoMdNotificationsOutline } from 'react-icons/io'

type Props = {}

const DashboardHeader: FC<Props> = (props: Props) => {

    const [open, setOpen] = useState(false)

    return (
        <div className='w-full flex justify-end items-center bg-gray-500 my-3'>
            <ThemeSwitcher/>
            <div className="relative cursor-pointer m-2">
                <IoMdNotificationsOutline className='text-2xl'/>
                <span className='absolute -top-2 right-0 bg-[--t-blue] rounded-full w-[18px] h-[18px] flex items-center justify-center'>3</span>
            </div>
            <div className="w-[350px] h-[50vh] bg-white dark:bg-[#111C43] absolute bg-[--t-blue] top-16 right-3"></div>
        </div>
    )
}

export default DashboardHeader