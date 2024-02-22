import { Box, Grid, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { styles } from '@/app/styles/style'

type Props = {
    label?: React.ReactNode,
    children?: React.ReactNode,
    type?: any,
    style?: any,
    name?: string,
    id?: string,
    labelStyle?: any,
    [rest: string]: any
}

const InputField = (props: Props) => {

    const { label, children, style, labelStyle, type, ...rest } = props
    return (
        <Grid item xs={style?.xs || 12} md={style?.md || 6} lg={style?.lg || 4} sx={style}>
            {label && <label htmlFor={rest.name} className={labelStyle}>{label}
            </label>}
            {children || <input type={type} className={`${styles.input} mt-[5px] ${rest.classes}`} {...rest} />}
        </Grid>


    )
}

export default InputField