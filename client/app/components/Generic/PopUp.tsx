import { CloseOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { FC, ReactNode } from 'react'
import { PopUpStyles } from './genericStyles'
import { createPortal } from 'react-dom'
type Props = {
    open: boolean,
    close?: boolean,
    setOpen: (open: boolean) => void,
    size?: string | any,
    children?: ReactNode,
    title?: string,
    customStyle?:any
}

const PopUp: FC<Props> = (props) => {
    const { open, setOpen, close = false, title, children, size = "md" ,customStyle } = props;
    const { BackDropStyle, ModalStyle, ModalSizes, ModalHeader, ModalBody } = PopUpStyles
    // console.log("Rendered Popup")
    const portalRoot: any = document.getElementById("portal-root")
    return createPortal(
        <>
            {open && <div className={BackDropStyle}
                onClick={() => setOpen(false)}
            >
                <div className={`${ModalStyle} ${ModalSizes[size]} ${customStyle}`} onClick={(e) => e.stopPropagation()}>
                    <div className={ModalHeader}>
                        <h2>{title}</h2>
                        {close && <IconButton color='inherit' onClick={() => setOpen(false)}>
                            <CloseOutlined />
                        </IconButton>}
                    </div>
                    <div className={ModalBody}>
                        {children}
                    </div>
                </div>
            </div>}
        </>,
        portalRoot
    )
}

export default PopUp