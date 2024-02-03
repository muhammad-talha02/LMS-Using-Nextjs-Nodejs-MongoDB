import React, { FC, useState } from 'react'
import ThemeSwitcher from '../../ThemeSwitcher'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { Typography } from '@mui/material'
import Notifications from './Notifications'

type Props = {}

const DashboardHeader: FC<Props> = (props: Props) => {


    return (
        <div className='flex bg-red-800 sticky top-0 justify-end items-center border dark:border-[#111C43] rounded-md border-gray-500'>
            <ThemeSwitcher />
            <Notifications />
        </div>
    )
}

export default DashboardHeader