import { Box, Button, IconButton } from '@mui/material'
import React, { FC, useState } from 'react'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import { PopUp } from '../../Generic'
import { useDeleteUserMutation } from '@/redux/features/user/userApi'
import useMutation from '@/app/_hooks/useMutation'
import ConfirmModal from '../../Generic/Modals/ConfirmModal'

interface IDeleteAction {
    action?: () => void
}

export const DeleteAction: FC<IDeleteAction> = (props) => {
    const { action } = props
    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false)

    return (
        <>
            <IconButton onClick={() => setDeleteConfirmModal(true)} >
                <AiOutlineDelete size={20} className='dark:text-white text-black' />
            </IconButton>
            {deleteConfirmModal && <ConfirmModal open={deleteConfirmModal} setOpen={setDeleteConfirmModal} action={() => {
                action?.()
                setDeleteConfirmModal(false)
            }} />
            }

        </>
    )
}

