"use client"
import React from 'react'
import Heading from '../../utils/Heading'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminProtected from '../../hooks/adminProtected'
import DashboardHero from '../../components/admin/DashboardHero'

type Props = {}

const Page = (props: Props) => {
    return (
        <DashboardHero />
    )
}

export default Page