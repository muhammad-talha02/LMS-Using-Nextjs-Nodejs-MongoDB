import React, { ChangeEvent, FC } from 'react'
import InputField from '../../form/InputField'
import { Grid } from '@mui/material'
import { styles } from '@/app/styles/style'

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
    const handleChange = (e: ChangeEvent<any>) => {

        setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value })
    }

    return (
        <div className='w-[80%] m-auto mt-24'>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>

                    <InputField
                        style={{ xs: 12, lg: 12 }}
                        type="text"
                        name='name'
                        id='name'
                        required
                        placeholder="Please enter course name"
                        label={"Course Name:"}
                        value={courseInfo.name}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ lg: 12 }}
                        name='description'
                        label={"Course Description:"}
                    >
                        <textarea rows={8} className={`${styles.input} !h-auto py-2`} placeholder='Write something amazing' name='description' value={courseInfo.description} onChange={handleChange}>

                        </textarea>
                    </InputField>
                    <InputField
                        style={{ xs: 12, lg: 6 }}
                        type="number"
                        name='price'
                        id='price'
                        required
                        placeholder="Please enter course price"
                        label={"Course Price:"}
                        value={courseInfo.price}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ xs: 12, lg: 6 }}
                        type="number"
                        name='estimatedPrice'
                        id='estimatedPrice'
                        placeholder="Please enter estimated price"
                        label={"Estimated Price (Optioanl):"}
                        value={courseInfo.estimatedPrice}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ xs: 12, lg: 12 }}
                        type="text"
                        name='tags'
                        id='tags'
                        placeholder="Next 13, MERN Stack, JavaScript ..."
                        label={"Course tags"}
                        value={courseInfo.tags}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ xs: 12, lg: 6 }}
                        type="text"
                        name='level'
                        id='level'
                        placeholder="Beginner/Intermediate/Expert"
                        label={"Level"}
                        value={courseInfo.level}
                        onChange={handleChange}
                    />
                    <InputField
                        style={{ xs: 12, lg: 6 }}
                        type="text"
                        name='demoUrl'
                        id='demoUrl'
                        placeholder="..........."
                        label={"Demo URL"}
                        value={courseInfo.demoUrl}
                        onChange={handleChange}
                    />
                </Grid>
            </form>
        </div>
    )
}

export default CourseInformation