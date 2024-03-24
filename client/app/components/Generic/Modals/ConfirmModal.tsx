import { Box, Button } from '@mui/material'
import React, { FC } from 'react'
import { PopUp } from '..'

type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    title?: string,
    action: () => void
}

const ConfirmModal: FC<Props> = (props) => {

    const { open, setOpen, title, action } = props
    return (
        <>
            {open && <PopUp open={open} setOpen={setOpen} size={"sm"}>
                <Box>
                    <h2 className='prose text-black dark:text-white text-lg text-center'>{title || "Are you sure want to Delete?"}</h2>
                    <Box display={"flex"} justifyContent={"space-between"} my={3}>
                        <Button variant='contained' onClick={() => setOpen(false)}>Cancel</Button>
                        <Button variant='contained' color='error' onClick={() => action()}>Delete</Button>
                    </Box>
                </Box>
            </PopUp>}
        </>
    )
}

export default ConfirmModal