import React, { FC } from 'react'

type Props = {
    active: number,
    setActive: (active: number) => void,
    courseInfo: any,
    setCourseInfo: (courseInfo: any) => void
}

const CourseInformation: FC<Props> = (props) => {

    const { active, setActive, courseInfo, setCourseInfo } = props

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setActive(active + 1)

    }

    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit}>
                
            </form>
        </div>
    )
}

export default CourseInformation