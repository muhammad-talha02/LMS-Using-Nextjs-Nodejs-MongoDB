"use client"
import { redirect } from "next/navigation"
import useAuth from "./useAuth"
import { ReactNode } from "react"
type Props = {
    children: ReactNode
}

const Protected = ({ children }: Props) => {
    const isAuthenticated = useAuth()


    return isAuthenticated ? children : redirect('/')
}

export default Protected