import { Grid, InputLabel, TextField } from '@mui/material'
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
            <InputLabel {...test}>{label}</InputLabel>
            {children}
        </Grid >

    )
}

export default InputLayout