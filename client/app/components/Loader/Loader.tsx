
"use client"
import React from 'react'
import "./loader.css"
type Props = {}

const Loader = (props: Props) => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="loader"></div>
    </div>
  )
}
export const DataLoader = (props: Props) => {
  return (
    <div className='flex justify-center items-center'>
      <div className="loader !w-[35px] !h-[35px]"></div>
    </div>
  )
}

export default Loader