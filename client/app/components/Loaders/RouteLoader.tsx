"use client"
import { LinearProgress } from '@mui/material'
import { styled } from '@mui/system'
import router from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode,
    // Props?: any
}

const LoaderWrapper = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    width: "100%"
})

const RouteLoader = ({ children }: Props) => {

    // const router = useRouter();
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const handleRouteStart = (url:any) => {
            console.log({url});
            // console.log(router.asPath)
         }
        const handleRouteComplete = () => { }
        const handleRouteError = () => { }


        router.events.on("routeChangeStart", handleRouteStart)
        router.events.on("routeChangeComplete", handleRouteComplete)
        router.events.on("routeChangeError", handleRouteError)

    })



    return (
        <>
        <LoaderWrapper className='fixed top-0 left-0 z-50 w-full'>
            <LinearProgress className='text-white' />
        </LoaderWrapper>
        {children}
        </>
    )
}

export default RouteLoader