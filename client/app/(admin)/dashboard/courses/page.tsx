"use client"
import { AllCourses } from '@/app/components/admin/course'
import { Box, Button, IconButton } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useTheme } from 'next-themes'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

type Props = {}

const AllCoursesPage = (props: Props) => {
  return (
    <AllCourses />
  )
}

export default AllCoursesPage