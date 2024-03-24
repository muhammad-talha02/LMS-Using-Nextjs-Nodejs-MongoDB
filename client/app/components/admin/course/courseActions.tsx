import { Box, Button, IconButton } from '@mui/material'
import React, { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import { PopUp } from '../../Generic'
import { useDeleteUserMutation } from '@/redux/features/user/userApi'
import useMutation from '@/app/_hooks/useMutation'
import ConfirmModal from '../../Generic/Modals/ConfirmModal'

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
    const handleDeleteCourse = async (userId: number) => {
        await DeleteUserAction(userId)
    }
    return (
        <>
            <IconButton>
                <AiOutlineDelete size={20} className='dark:text-white text-black' onClick={() => setDeleteConfirmModal(true)} />
            </IconButton>
            {deleteConfirmModal && <ConfirmModal open={deleteConfirmModal} setOpen={setDeleteConfirmModal} action={() => handleDeleteCourse(id)} />
            }

        </>
    )
}

