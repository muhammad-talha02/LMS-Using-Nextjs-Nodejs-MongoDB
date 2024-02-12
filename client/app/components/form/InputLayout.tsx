import { FormControl, FormLabel, Grid, InputLabel, TextField } from '@mui/material'
import React from 'react'

type Props = {
    htmlFor?: string,
    label?: string,
    children?: React.ReactNode
}

const InputLayout = (props: Props) => {

    const { label, children, ...test } = props
    return (
        <Grid item xs={12}>
            <FormControl fullWidth className='text-black dark:text-white'>
                <FormLabel htmlFor='test'>ahsgdadj</FormLabel>
                {/* <InputLabel {...test}>{label}</InputLabel> */}
                {children}
            </FormControl>
        </Grid >

    )
}

export default InputLayout