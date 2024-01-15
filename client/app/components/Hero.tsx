import Image from 'next/image'
import React from 'react'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='w-full h-screen'>
      <div className="flex">

      <div className="heroImg">
        {/* <Image src={"/"}/> */}
        <div>
          <Image src="https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width={500} height={500} alt="" />
        </div>
      </div>
      <div className="heroContent dark:text-white text-black">
        <h1>Improve Your Online Learning Experience Better Instantly</h1>
      </div>
      </div>
    </div>
  )
}

export default Hero