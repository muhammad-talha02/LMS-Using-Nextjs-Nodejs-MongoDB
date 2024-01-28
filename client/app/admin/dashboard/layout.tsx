"use client"
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import DashboardHero from '@/app/components/admin/DashboardHero'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React, { useState } from 'react'

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
    <div className="flex h-[200vh]">
        <div>
        {/* <div className={`${collapsed ? "w-[80px]" :"w-[280px]"}`}> */}
            <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
        </div>
        <div className={`${collapsed ? "ml-[60px]" :"ml-[280px]"} w-full`}>
            {children}   
        </div>
    </div>
</AdminProtected>
  )
}

export default Layout