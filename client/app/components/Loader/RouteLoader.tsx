"use client"
import { LinearProgress } from '@mui/material'
import { styled } from '@mui/system'
// import { useRouter } from 'next/router'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
    children?: React.ReactNode,
    on?: any,
    loading: boolean,
    setLoading: any 
}

const LoaderWrapper = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 100,
    width: "100%"
})

const RouteLoader = ({ children, loading, setLoading }: Props) => {

    const pathname = usePathname();
    const params = useSearchParams();
    const currentPath = useRef(pathname)
    console.log("CurrentPath Path -->", pathname)
    console.log("Old Path -->", currentPath.current)
    console.log("State -->", loading)

    useEffect(() => {
        // setLoading(true)
        // const url = pathname + params.toString()
        console.log("Use effect-->")
        if (currentPath.current !== pathname) {
            console.log("etting pah")
            setLoading(true)
            currentPath.current = pathname
        }
        if (currentPath.current === pathname) {
            console.log("CLosing...")
            setLoading(false)
        }

    }, [currentPath.current])



    return (
        <>{loading &&
            <LoaderWrapper className='fixed top-0 left-0 z-50 w-full'>
                <LinearProgress className='text-white' />
            </LoaderWrapper>}
            {children}
        </>
    )
}

export default RouteLoader