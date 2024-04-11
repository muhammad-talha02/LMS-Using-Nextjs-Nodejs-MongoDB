"use client"
import { AllCourses } from '@/app/components/admin/course'
import { styles } from '@/app/styles/style'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

type Props = {}

const AllCoursesPage = (props: Props) => {
  return (
    <>
      <h1 className={`${styles.title} mt-3`}>All Courses</h1>
      <AllCourses />
    </>
  )
}

export default AllCoursesPage