import Image from 'next/image'
import React from 'react'
import { H1 } from '../TailwindComponents/Headings'
import { BiSearch } from 'react-icons/bi'
import Link from 'next/link'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='m-auto'>
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center my-14">

        <div className="heroImg w-full max-w-[500px] flex justify-center items-center">
          {/* <Image src={"/"}/> */}
          <div className='w-[350px] h-[350px]'>
            <Image src="https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={500} height={500} alt="" className="rounded-full object-cover w-full h-full hero_animation" />
          </div>
        </div>
        <div className="heroContent p-2 800px:p-1 flex flex-col gap-2 dark:text-white text-black max-w-[430px] w-full">
          <H1 classes='text-[40px] leading-tight'>Improve Your Online Learning Experience Better Instantly</H1>
          <p className='text-[14px]'>We have 400+ courses & 500k+ online registered stduents. Find your desired courses from them.</p>
          <div className='w-full flex'>
            <input type='text' placeholder='Search Courses...' className='w-full text-black dark:bg-white bg-[#d5d5d5] outline-none border-solid border-black p-1' />
            <button className='dark:bg-[--t-blue] bg-[crimson] text-white px-3 py-2'><BiSearch /></button>
          </div>
          <div className="contentBottom items-center flex gap-2 my-2">
            <div className='flex'>
              <Image src={"https://raw.githubusercontent.com/muhammad-talha02/Facebook-Api/main/public/images/person/1.jpeg"} className='border-2 border-solid border-white rounded-full w-[35px] h-[35px] object-cover' width={25} height={25} alt='' />
              <Image src={"https://raw.githubusercontent.com/muhammad-talha02/Facebook-Api/main/public/images/person/2.jpeg"} className='ml-[-10px] border-2 border-solid border-white rounded-full w-[35px] h-[35px] object-cover' width={25} height={25} alt='' />
              <Image src={"https://raw.githubusercontent.com/muhammad-talha02/Facebook-Api/main/public/images/person/4.jpeg"} className='ml-[-10px] border-2 border-solid border-white rounded-full w-[35px] h-[35px] object-cover' width={25} height={25} alt='' />
            </div>
            <p className='text-[14px]'>500k+ Poeple already trusted on us. <Link href={"/"} className='dark:text-[--t-blue] text-[crimson] font-bold'>View Courses</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero