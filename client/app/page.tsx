"use client"

import { FC } from "react"
import Heading from "./utils/Heading"


interface Props {

}


const Page: FC<Props> = (props) => {
  return (
    <div>
      <Heading
        title="Compile Academy"
        description="Compile academy is a platform for students to learn and enhance skills."
        keywords="Programming,MERN,Machine Learning"
      />
    </div>
  )
}


export default Page