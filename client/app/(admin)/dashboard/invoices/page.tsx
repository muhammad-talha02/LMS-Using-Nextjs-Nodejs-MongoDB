'use client'
import AllInvoices from '@/app/components/admin/order/AllInvoices'
import { styles } from '@/app/styles/style'
import { Box } from '@mui/material'
import React from 'react'

type Props = {}

const AllInvoicesPage = (props: Props) => {
    return (
        <div>
            <h1 className={`${styles.title} mt-3`}>All Orders</h1>
            <Box m={"20px"}>
            <AllInvoices />
            </Box>
        </div>
    )
}

export default AllInvoicesPage