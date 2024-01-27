'use client'
import React, { useState } from 'react'

import Heading from '../utils/Heading'
import { Header } from '../components'
import Protected from '../hooks/useProtected'
import { useSelector } from 'react-redux'
import Profile from '../components/profile/Profile'

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(0)
    const [route, setRoute] = useState("Login")


    const {user} = useSelector((state:any)=> state.auth)
    return (

        <div>
            <Protected>

                <Heading
                    title={`${user?.name} Profile`}
                    description="Compile academy is a platform for students to learn and enhance skills."
                    keywords="Programming,MERN,Machine Learning"
                />
                <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />

                <Profile user={user}/>
            </Protected>

        </div>
    )
}

export default Page