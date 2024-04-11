import AllUsers from '@/app/components/admin/users/AllUsers'
import { styles } from '@/app/styles/style'
import React from 'react'

type Props = {}

const Users = (props: Props) => {
    return (
        <>
            <h1 className={`${styles.title} mt-3`}>All Users</h1>

            <AllUsers />
        </>
    )
}

export default Users