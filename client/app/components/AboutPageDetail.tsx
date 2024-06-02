
import React from 'react'
import { styles } from '../styles/style'

type Props = {}

const AboutPageDetail = (props: Props) => {
  return (
    <div>
      <h1 className={`${styles.title} !text-[35px]`}>
        What is <span className='text-[--t-red] dark:text-[--t-blue]'>Compile Academy?</span>
      </h1>
      <div className="w-[95%] 800px:w-[85%] m-auto">
        <div className="text-[18px] font-Poppins">
          <p>Welcome to Compile Academy, where we transform learning into a dynamic and engaging experience. At Compile Academy, we believe in the power of education to unlock potential, foster innovation, and build a brighter future. Our mission is to provide a comprehensive, accessible, and flexible learning platform that caters to the diverse needs of students, educators, and professionals worldwide.</p>
          <br />
          <h2 className={`${styles.title} !text-left`}>Our Vision</h2>
          <p className="text-[18px] font-Poppins">Compile Academy envisions a world where knowledge is accessible to everyone, everywhere. We aim to bridge the gap between traditional education and the evolving demands of the digital age by offering cutting-edge courses, personalized learning paths, and a supportive community of learners and educators.</p>
          <br />
          <h2 className={`${styles.title} !text-left`}>Our Mission</h2>
          <p className="text-[18px] font-Poppins">
            Our mission is to empower individuals to achieve their educational and professional goals through high-quality, affordable, and flexible learning solutions. We strive to:
          </p>
          <br />
          <li> <b>Innovate:</b> Continuously develop and deliver up-to-date courses that reflect the latest industry trends and technological advancements.</li>
          <li> <b>Support:</b> Provide a collaborative and inclusive learning environment where students can thrive, supported by expert instructors and a vibrant community.</li>
          <li> <b>Inspire:</b> Encourage lifelong learning and curiosity, helping learners to grow personally and professionally.</li>
          <br />
          <h2 className='text-[22px] font-semibold'>Muhammad Talha Saeed -</h2>
          <h3 className=''>Founder and CEO of Compiler Academy</h3>
        </div>
      </div>
    </div>
  )
}

export default AboutPageDetail