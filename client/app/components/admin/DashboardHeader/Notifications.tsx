import { styles } from '../../../styles/style'
import { Badge, Paper, Typography } from '@mui/material'
import React, { FC, useEffect, useRef, useState } from 'react'
import { IoMdNotificationsOutline } from 'react-icons/io'

type NotificationsProps = {}

const Notifications: FC<NotificationsProps> = (props) => {
  const [open, setOpen] = useState(false)
  const notificationsRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const hideOnClickOutside = (e: any) => {
      if (notificationsRef.current && !notificationsRef?.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("click", hideOnClickOutside)
    return () => {
      document.removeEventListener("click", hideOnClickOutside)

    }
  }, [])

  return (
    <div ref={notificationsRef}>
      <Badge badgeContent={5} color='primary' className="cursor-pointer mr-2 md:mr-5 text-[5px] select-none" id='notifyIcon' max={9} onClick={() => setOpen(!open)}>
        <IoMdNotificationsOutline className='text-2xl -mr-1' />
        {/* <span className='absolute -top-1 right-0 bg-[--t-blue] rounded-full w-[16px] h-[16px] text-[10px] flex items-center justify-center'>5</span> */}
      </Badge>
      {
        open && <Paper className="customScrollBar dark:text-white text-black w-[280px] h-[50vh] bg-white border-[1px] dark:border-gray-600 rounded-sm dark:bg-[#111C43] absolute bg-[--t-blue] top-12 right-6 pt-2  overflow-y-scroll">
          <Typography component={"h4"} fontSize={18} textAlign={"center"} className={`${styles.borderBottom}`}>Notifications</Typography>
          <div className="w-full">
            <NotifyBox />
          </div>
        </Paper>
      }
    </div>
  )
}


const NotifyBox = () => {
  return (
    <>
      <div className={`notify p-2 ${styles.borderBottom} opacity-60 cursor-pointer`}>
        <div className="flex justify-between text-[14px]">
          <span className=''>New Question (unread)</span>
          <span>3 days ago</span>
        </div>
        <Typography className="notifyMsg" fontSize={12}>
          Hi, I want to buy a course from your side so please update me about how can i know about more about your features.
        </Typography>
      </div>
    </>
  )
}

export default Notifications