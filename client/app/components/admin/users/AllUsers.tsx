"use client"
import { useGetAllUsersQuery } from '@/redux/features/user/userApi'
import { Box, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai'
import { format } from "timeago.js"
import TableWrapper from '../TableWrapper'
import { FC } from 'react'
import { styles } from '@/app/styles/style'
type Props = {
    isTeam?: boolean
}

const AllUsers: FC<Props> = ({ isTeam }) => {
    const { data: AllUsers, isSuccess, isLoading } = useGetAllUsersQuery({})

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "name", flex: 0.8 },
        { field: "email", headerName: "email", flex: 0.8 },
        { field: "role", headerName: "role", flex: 0.5 },
        { field: "purchased", headerName: "Purchased", flex: 0.5 },
        { field: "joinedAt", headerName: "Joined At", flex: 0.5 },
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (param: any) => {
                return (
                    <>
                        <IconButton>
                            <AiOutlineDelete size={20} className='dark:text-white text-black' />
                        </IconButton>
                    </>
                )
            }
        },
        {
            field: "  ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <a href={`mailto:${params.row.email}`}>
                        <IconButton>
                            <AiOutlineMail size={20} className='dark:text-white text-black' />
                        </IconButton>
                    </a>
                )
            }
        },
    ]
    console.log(AllUsers)

    const rows: any = []

    if (isTeam) {
        const newData = AllUsers && AllUsers?.users?.filter((user: any) => user?.role === "admin");

        newData?.forEach((item: any, index: number) => {
            rows.push({
                id: item?._id,
                name: item.name,
                email: item.email,
                purchased: item?.courses?.length,
                role: item.role,
                joinedAt: format(item?.createdAt)
            })
        })
    }
    else {
        AllUsers && AllUsers?.users?.forEach((item: any, index: number) => {
            rows.push({
                id: item?._id,
                name: item.name,
                email: item.email,
                purchased: item?.courses?.length,
                role: item.role,
                joinedAt: format(item?.createdAt)
            })
        })
    }
    return (
        <div className='mt-20'>
            <Box m="20px">
                {isLoading ? "loading" : <Box>
                    <div className="flex w-full justify-end">
                        <button className={`${styles.button} !w-[220px] rounded-lg`}>Add New Member</button>
                    </div>
                    <TableWrapper>
                        <DataGrid checkboxSelection columns={columns} rows={rows} />
                    </TableWrapper>
                </Box>
                        }
            </Box>
        </div>
    )
}

export default AllUsers