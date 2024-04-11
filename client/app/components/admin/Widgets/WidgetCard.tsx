import { CircularProgress } from '@mui/material'
import React, { FC, ReactElement, ReactNode } from 'react'
import { IconType } from 'react-icons'
// import { FaMoneyBill } from 'react-icons/fa'

type Props = {
  Icon: ReactNode,
  label: string,
  value: ReactNode,
  circleColor?: "success" | "error" | "primary" | "info" | "warning"
}

const WidgetCard: FC<Props> = (props) => {
  const { Icon, label, value, circleColor = "success" } = props
  return (
    <>
      <div className='flex justify-between shadow-sm dark:shadow-md dark:shadow-white-800 shadow-gray-600 hover:shadow-gray-900 border-gray py-3 px-3 rounded-md dark:bg-[#111C43]'>
        <div className="flex flex-col gap-2 justify-between px-1">
          {Icon}

          <p className='font-bold text-[25px]'>{value}</p>
          <p className='font-semibold'>{label}</p>
        </div>
        <div className='flex justify-center items-center'>
          <CircularProgress variant='determinate' value={100} color={circleColor} />

        </div>
      </div>
    </>
  )
}

export default WidgetCard