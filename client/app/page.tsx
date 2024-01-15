"use client"

import { FC, useState } from "react"
import Heading from "./utils/Heading"
import Header from "./components/Header"
import { Hero } from "./components"


interface Props {

}
const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  return (
    <div>
      <Heading
        title="Compile Academy"
        description="Compile academy is a platform for students to learn and enhance skills."
        keywords="Programming,MERN,Machine Learning"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
      <Hero/>
    </div>
  )
}


export default Page