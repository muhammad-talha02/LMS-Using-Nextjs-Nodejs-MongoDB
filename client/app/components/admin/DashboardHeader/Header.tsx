import React, { FC, useState } from 'react'
import ThemeSwitcher from '../../ThemeSwitcher'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Typography } from '@mui/material'
import Notifications from './Notifications'

type Props = {}

const DashboardHeader: FC<Props> = (props: Props) => {


    return (
        <div className='flex z-[10] dark:bg-[#0f1522] bg-white sticky top-0 justify-end items-center border-b-[1px] dark:border-[#111C43] dark:border-b-[#9b9b9b] border-b-gray-200 h-[61px] px-2'>
            <ThemeSwitcher />
            <Notifications />
        </div>
    )
}

export default DashboardHeader