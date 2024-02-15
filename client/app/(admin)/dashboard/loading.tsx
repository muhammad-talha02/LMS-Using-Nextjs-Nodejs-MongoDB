"use client"
import { LinearProgress, Typography } from '@mui/material'
import { styled } from '@mui/system'

import React from 'react'

type Props = {}
const LoaderWrapper = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 10000,
  width: "100%"
})

const loading = (props: Props) => {
  return (
    <>
      <LoaderWrapper className='fixed top-0 left-0 z-50 w-full'>
        <LinearProgress className='text-white' />
      </LoaderWrapper></>

  )
}

export default loading