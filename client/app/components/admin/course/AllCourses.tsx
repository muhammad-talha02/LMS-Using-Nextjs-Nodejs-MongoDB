"use client"
import { Box, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'
import TableWrapper from '../TableWrapper'
import { useDeleteCourseMutation, useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import {format} from "timeago.js"
import ConfirmModal from '../../Generic/Modals/ConfirmModal'
import { DeleteAction } from './courseActions'
import useMutation from '@/app/_hooks/useMutation'
import Link from 'next/link'
import Loader, { DataLoader } from '../../Loader/Loader'
type Props = {}

const AllCourses = (props: Props) => {
  const { theme, setTheme } = useTheme()
  const { data: AllCourses, isSuccess, isLoading } = useGetAllCoursesQuery({})


  //? --API Delete Course Mutation
  const { actionApi: DeleteCourseAction } = useMutation({
    api: useDeleteCourseMutation,
    successMsg: "Course Delete Successfully",
    })
//! -- Handle Delete Course
const handleDeleteCourse = async (userId: number) => {
    await DeleteCourseAction(userId)
}
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
            <Link href={{pathname:`/dashboard/courses/edit-course/${param.row.id}`}}>
              <FiEdit2 size={20} className='dark:text-white text-black' />
            </Link>
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
            <DeleteAction action={()=> handleDeleteCourse(param.row.id)}/>
        </>
        )
      }
    }
  ]
  console.log(AllCourses)

  const rows: any = [

  ]

  {
    AllCourses && AllCourses?.courses?.forEach((item: any, index: number) => {
      rows.push({
        id: item?._id,
        title: item.name,
        ratings: item.ratings,
        purchased: item.purchased,
        created_at: format(item.createdAt)
      })
    })
  }
  return (
    <div className=''>
      <Box m="20px">
        {isLoading ? <DataLoader/> : <TableWrapper>
          <DataGrid checkboxSelection columns={columns} rows={rows} />

        </TableWrapper>}
      </Box>
    </div>
  )
}

export default AllCourses