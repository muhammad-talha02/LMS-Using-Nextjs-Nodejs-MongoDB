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
  const [route, setRoute] = useState("Login")
  return (
    <div>
      <Heading
        title="Compile Academy"
        description="Compile academy is a platform for students to learn and enhance skills."
        keywords="Programming,MERN,Machine Learning"
      />
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route}/>
      <div className="w-full max-w-[1200px] m-auto">

      <Hero/>
      </div>
    </div>
  )
}


export default Page