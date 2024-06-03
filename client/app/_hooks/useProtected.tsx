"use client"
import { redirect } from "next/navigation"
import useAuth from "./useAuth"
import { ReactNode } from "react"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import Loader from "../components/Loader/Loader"
type Props = {
    children: ReactNode
}

const Protected = ({ children }: Props) => {
    const isAuthenticated = useAuth()
    const { data, isLoading } = useLoadUserQuery({})
    // console.log("User")
    // alert("hey")
// console.log("object", data)
    if (isLoading) return <Loader />
    return data?.user ? children : redirect('/')
}

export default Protected