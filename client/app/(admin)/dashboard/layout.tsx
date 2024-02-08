"use client"
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import DashboardHeader from '@/app/components/admin/DashboardHeader/Header'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React, { useState } from 'react'
import "../../components/admin/admin.css"
import RouteLoader from '@/app/components/Loader/RouteLoader'
type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(true)

    return (
        <AdminProtected>

            {/* </RouteLoader> */}

            <div className="">
                <div>
                    {/* <div className={`${collapsed ? "w-[80px]" :"w-[280px]"}`}> */}
                    <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                </div>
                <div className={`${collapsed ? "ml-[60px]" : "ml-[280px]"} h-[200vh]`}>
                    <DashboardHeader />
                    <div className='px-3'>
                        {/* <RouteLoader loading={loading} setLoading={setLoading}> */}
                            {children}
                        {/* </RouteLoader> */}
                    </div>
                </div>
            </div>
        </AdminProtected>
    )
}

export default Layout