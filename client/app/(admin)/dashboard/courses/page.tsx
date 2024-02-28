"use client"
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

type Props = {}

const AllCourses = (props: Props) => {
    const { theme, setTheme } = useTheme()

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "title", headerName: "Course title", flex: 1 },
        { field: "ratings", headerName: "Ratings", flex: 0.5 },
        { field: "purchased", headerName: "Purchased", flex: 0.5 },
        { field: "created_at", headerName: "Created At", flex: 0.5 },
        {
            field: "",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (param: any) => {
                return (
                    <>
                        <IconButton>
                            <AiOutlineDelete size={20} />
                        </IconButton>
                    </>
                )
            }
        }
    ]

    const data = [
        {
            id: 125,
            title: "MERN Stack",
            ratings: 5,
            purchased: 50,
            created_at: "12 Feb 2024"
        }
    ]
    return (
        <div className='mt-20'>
            <Box m="20px">
<DataGrid columns={columns} rows={data}/>
            </Box>
        </div>
    )
}

export default AllCourses