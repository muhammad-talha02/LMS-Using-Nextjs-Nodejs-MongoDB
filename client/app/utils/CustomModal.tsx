import React, { Component, FC } from 'react'
import { Box, Modal } from "@mui/material"
type Props = {
    open: boolean,
    setOpen: (open: boolean) => void,
    activeItem: any,
    Component?: any,
    setRoute?: (route: string) => void
}

const CustomModal: FC<Props> = (props) => {
    const { open, setOpen, activeItem, Component, setRoute } = props
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white w-[450px] dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">

                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>
        </Modal>
    )
}

export default CustomModal