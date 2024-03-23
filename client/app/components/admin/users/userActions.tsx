import { Box, Button, IconButton } from '@mui/material'
import React, { FC, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { PopUp } from '../../Generic'
import { useDeleteUserMutation } from '@/redux/features/user/userApi'
import useMutation from '@/app/_hooks/useMutation'

interface IDeleteAction {
    id: number
}

export const DeleteAction: FC<IDeleteAction> = (props) => {
    const { id } = props
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)
    const { actionApi: DeleteUserAction } = useMutation({
        api: useDeleteUserMutation,
        successMsg: "User Delete Successfully",
        successFunc: () => {
            setDeleteConfirmModal(false)
        }
    })
    //! -- Handle Delete User
    const handleDeleteUser = async (userId: number) => {
        await DeleteUserAction(userId)
    }
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
                        <Button variant='contained' color='error' onClick={() => handleDeleteUser(id)}>Delete</Button>
                    </Box>
                </Box>
            </PopUp>}
        </>
    )
}
