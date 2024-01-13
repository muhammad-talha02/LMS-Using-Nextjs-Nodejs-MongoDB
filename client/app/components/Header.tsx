"use client"

import React, { FC } from 'react'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    activeItem: number
}

const Header: FC<Props> = (props) => {

    const { open, setOpen, activeItem } = props
    return (
        <div className='w-full relative'>
            <div className={`${activeItem ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500" : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"}`}></div>
        </div>
    )
}

export default Header