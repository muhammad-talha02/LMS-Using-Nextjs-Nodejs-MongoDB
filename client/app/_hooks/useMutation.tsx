import React, { FC, useEffect } from 'react'
import toast from 'react-hot-toast'

type Props = {
    api: any,
    successMsg?: any,
    successFunc?: () => void
}

const useMutation = ({ api, successMsg = "Success", successFunc }: Props) => {
    const [actionApi, result] = api()
    useEffect(() => {
        if (result.isSuccess) {
            if(successMsg){
                toast.success(successMsg)
            }
            if (successFunc) {
                successFunc()
            }

        }
        if (result.isError) {
            toast.error(result.error.data.message || "Error")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [result.isSuccess, result.isError, result.error])


    return { result, actionApi }
}

export default useMutation