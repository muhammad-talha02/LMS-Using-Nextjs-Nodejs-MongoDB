"use client"
import { Box, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'

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
      field: " ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (param: any) => {
        return (
          <>
            <IconButton>
              <FiEdit2 size={20} />
            </IconButton>
          </>
        )
      }
    },
    {
      field: "  ",
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
        <Box m={"40px 0 0 0"}
          height={"80vh"}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none"
            },
            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
              color: theme === "dark" ? "#fff" : "#000"
            },
            "& .MuiDataGrid-sortIcon": {
              color: theme === "dark" ? "#fff" : "#000"
            },
            "& .MuiDataGrid-row": {
              color: theme === "dark" ? "#fff" : "#000",
              borderBottom: theme === "dark" ? "1px solid #fffff30 !important" :
                "1px solid #ccc !important"
            },
            "& .MuiTablePagination-root": {
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              color: theme === "dark" ? "#fff" : "#000",
              borderTop: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              borderTop: "none",
              color: theme === "dark" ? "#fff" : "#000",
            },
            "& .MuiCheckbox-root": {
              color: theme === "dark" ? "#b7ebde" : "#000",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: "#fff !important",
            },
          }}
        >


        <DataGrid checkboxSelection columns={columns} rows={data} />
        </Box>
      </Box>
    </div>
  )
}

export default AllCourses