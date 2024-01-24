import React, { FC, useEffect } from 'react'
import toast from 'react-hot-toast'

type Props = {
    api: any,
    successMsg?: string
}

const useMutation = ({ api, successMsg = "Success" }: Props) => {
    const [actionApi, result] = api()

    useEffect(() => {
        if (result.isSuccess) {
            toast.success(successMsg)
        }
        if (result.isError) {
            console.log("Error ->", result.error)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.isSuccess, result.isError, result.error])


    return { result, actionApi }
}

export default useMutation