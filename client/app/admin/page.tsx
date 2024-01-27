"use client"
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/admin/AdminSidebar'

type Props = {}

const Admin = (props: Props) => {
    return (
        <>
            <Heading
                title="Admin | Compile Academy "
                description="Compile academy is a platform for students to learn and enhance skills."
                keywords="Programming,MERN,Machine Learning"
            />
            <div className="flex h-[200vh]">
                <div className="1500px:w-[16%] w-1/5">
                    <AdminSidebar/>
                </div>
                <div className="w-[85%]"></div>
            </div>
        </>
    )
}

export default Admin