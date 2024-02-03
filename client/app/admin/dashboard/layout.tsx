"use client"
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import DashboardHeader from '@/app/components/admin/DashboardHeader/Header'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React, { useState } from 'react'
import "../../components/admin/admin.css"
type Props = {
    children:React.ReactNode
}

const Layout = ({children}: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <AdminProtected>
    <Heading
        title="Admin | Compile Academy "
        description="Compile academy is a platform for students to learn and enhance skills."
        keywords="Programming,MERN,Machine Learning"
    />
    <div className="">
        <div>
        {/* <div className={`${collapsed ? "w-[80px]" :"w-[280px]"}`}> */}
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
        </div>
        <div className={`${collapsed ? "ml-[60px]" :"ml-[280px]"} h-[200vh] p-3`}>
            <DashboardHeader/>
            {children}   
        </div>
    </div>
</AdminProtected>
  )
}

export default Layout