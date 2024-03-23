import { Box, Button, IconButton } from '@mui/material'
import React, { FC, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { PopUp } from '../../Generic'

interface IDeleteAction {
    id: number
}

export const DeleteAction: FC<IDeleteAction> = (props) => {
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
    return (
        <>
            <IconButton>
                <AiOutlineDelete size={20} className='dark:text-white text-black' onClick={() => setDeleteConfirmModal(true)} />
            </IconButton>
            {deleteConfirmModal && <PopUp open={deleteConfirmModal} setOpen={setDeleteConfirmModal} size={"sm"}>
                <Box>
                    <h2 className='prose text-black dark:text-white text-lg text-center'>Are you sure want to Delete?</h2>
                    <Box display={"flex"} justifyContent={"space-between"} my={3}>
                        <Button variant='contained' onClick={() => setDeleteConfirmModal(false)}>Cancel</Button>
                        <Button variant='contained' color='error'>Delete</Button>
                    </Box>
                </Box>
            </PopUp>}
        </>
    )
}
