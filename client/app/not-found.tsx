'use client'
import { redirect } from 'next/navigation'
import React from 'react'

const NotFound = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>

        <div className="text-center">
            <h1 className='text-[34px] font-semibold text-center'>Page Not Found!</h1>
            <div>
                <button className='text-white mt-2 dark:text-black bg-black dark:bg-white w-[120px] rounded-md px-1 py-2'
                onClick={()=>{
                    redirect("/")
                }}
                >Go Back</button>
            </div>
        </div>
    </div>
  )
}

export default NotFound