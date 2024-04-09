"use client"
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import DashboardHeader from '@/app/components/admin/DashboardHeader/Header'
import AdminProtected from '@/app/_hooks/adminProtected'
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
<>
        {/*  <AdminProtected> */}
            <Heading title='Admin | Compile Academy' description="Compile academy is a platform for students to learn and enhance skills."
                keywords="Programming,MERN,Machine Learning" />
            <div className="">
                <div>
                    {/* <div className={`${collapsed ? "w-[80px]" :"w-[280px]"}`}> */}
                    <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                </div>
                <div className={`${collapsed ? "800px:ml-[60px] ml-[60px]" : "800px:ml-[280px] ml-[60px]"} min-h-[100vh]`}>
                    <DashboardHeader />
                    <div className='px-3 z-0'>
                        {children}
                    </div>
                </div>
            </div>
         {/* </AdminProtected> */}
                </>
    )
}

export default Layout