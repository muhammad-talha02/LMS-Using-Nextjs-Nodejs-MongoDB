import { Typography } from '@mui/material'
import React, { useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'

type Props = {}

const Notifications = (props: Props) => {
    const [open, setOpen] = useState(false)

  return (
   <>
               <div className="relative cursor-pointer m-2">
                <IoMdNotificationsOutline className='text-2xl' onClick={()=> setOpen(!open)}/>
                <span className='absolute -top-2 right-0 bg-[--t-blue] rounded-full w-[18px] h-[18px] flex items-center justify-center'>3</span>
            </div>
            {/* <div className="w-[280px] h-[50vh] bg-white border border-black rounded-sm dark:bg-[#111C43] absolute bg-[--t-blue] top-16 right-3 pt-2">
                <Typography component={"h4"} fontSize={18} textAlign={"center"}>Notifications</Typography>
                <div className="w-full"></div>
            </div> */}
   </>
  )
}

export default Notifications