import { Grid, InputLabel, TextField } from '@mui/material'
import React from 'react'
import { InputLayout } from '.'

type Props = {
    label?: React.ReactNode,
    children?: React.ReactNode
}

const InputField = (props: Props) => {

    const { label, children } = props
    return (
        <InputLayout htmlFor='test'>
            <TextField id="test" label="Please enter" placeholder='Please enter'/>
        </InputLayout>


    )
}

export default InputField