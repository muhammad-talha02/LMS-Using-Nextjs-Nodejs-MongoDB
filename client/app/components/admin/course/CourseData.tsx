import { styles } from '@/app/styles/style'
import React, { FC } from 'react'
import { InputField } from '../../form'
import { Box, Button, Grid, IconButton } from '@mui/material'
import { AddCircle, Close } from '@mui/icons-material'
import { NextButton } from '.'
import toast from 'react-hot-toast'

type Props = {
    benefits: { title: string }[],
    setBenefits: (benefits: { title: string }[]) => void,
    prerequisites: { title: string }[],
    setPrerequisites: (prerequisites: { title: string }[]) => void,
    active: number,
    setActive: (active: number) => void
}

const CourseData: FC<Props> = (props) => {

    const { benefits, setBenefits, prerequisites, setPrerequisites, active, setActive } = props
    const handleBenefitsChange = (index: number, value: any) => {

        const updatedBenefits = [...benefits]
        updatedBenefits[index].title = value
        setBenefits(updatedBenefits)
    }
    const handleBenefitsDelete = (index: number,) => {

        let updatedBenefits = [...benefits]
        if (updatedBenefits.length > 1) {

            updatedBenefits.splice(index, 1)
            setBenefits(updatedBenefits)
        }
    }
    const handlePrerequisitesChange = (index: number, value: any) => {

        const updatedPrereuesities = [...prerequisites]
        updatedPrereuesities[index].title = value
        setPrerequisites(updatedPrereuesities)
    }
    const handlePrerequisitesDelete = (index: number,) => {

        let updatedPrereuesities = [...prerequisites]
        if (updatedPrereuesities.length > 1) {
            updatedPrereuesities.splice(index, 1)
            setPrerequisites(updatedPrereuesities)
        }
    }

    const handleNext = () => {
        if (benefits?.every((val) => val.title !== '') && prerequisites?.every((val) => val.title !== '')) {
            setActive(active + 1)
        }
        else {
            toast.error("Please fill all reuired fields")
        }
    }
    return (
        <div className='w-[80%] m-auto mt-24 block'>
            <Grid container>
                <Grid xs={12} item>

                    <label htmlFor="" className={`${styles.label} text-[20px]`}>
                        What are the benefits of this course?
                    </label>
                </Grid>
                {/* <br /> */}
                {
                    benefits?.map((benefit, index) => (
                        <>
                            <InputField type='text' key={index} value={benefit.title} name='Benefit' onChange={(e: any) => handleBenefitsChange(index, e.target.value)} style={{ lg: 10, marginBottom: "10px" }} placeholder="You will expert in MERN Stack" />

                            <IconButton onClick={() => handleBenefitsDelete(index)} disabled={benefits.length < 2}>
                                <Close color='error' />
                            </IconButton>


                        </>
                    ))
                }
                <Grid item lg={6}>

                    <AddCircle className='cursor-pointer' onClick={() => setBenefits([...benefits, { title: '' }])} />
                </Grid>
            </Grid>
            <Grid container my={3}>
                <Grid xs={12} item>

                    <label htmlFor="" className={`${styles.label} text-[20px]`}>
                        What are the Prerequesities of this course?
                    </label>
                </Grid>
                {/* <br /> */}
                {
                    prerequisites?.map((prerequisit, index) => (
                        <>
                            <InputField type='text' key={index} value={prerequisit.title} name='Benefit' onChange={(e: any) => handlePrerequisitesChange(index, e.target.value)} style={{ lg: 10, marginBottom: "10px" }} placeholder="You will expert in MERN Stack" />
                            <IconButton onClick={() => handlePrerequisitesDelete(index)} disabled={prerequisites.length < 2}>
                                <Close color='error' />
                            </IconButton>

                        </>
                    ))
                }
                <Grid item lg={6}>

                    <AddCircle className='cursor-pointer' onClick={() => setPrerequisites([...prerequisites, { title: '' }])} />
                </Grid>
            </Grid>
            <NextButton nextTitle='Next' prevTitle='Previous' handleNext={handleNext} handlePrev={() => setActive(active - 1)} />
        </div>
    )
}



export default CourseData