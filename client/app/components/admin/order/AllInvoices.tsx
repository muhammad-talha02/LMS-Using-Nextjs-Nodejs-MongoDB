import { useGetAllOrdersQuery } from '@/redux/features/orders/orderApi'
import { Box, IconButton } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'
import TableWrapper from '../TableWrapper'
import { format } from 'timeago.js'
import { AiOutlineMail } from 'react-icons/ai'
import { DataLoader } from '../../Loader/Loader'

type Props = {
  isDashboard?: boolean
}

const AllInvoices = ({ isDashboard }: Props) => {

  const { data: getAllOrders, isLoading } = useGetAllOrdersQuery({})

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "userName", headerName: "User Name", flex: 0.4 },
    { field: "price", headerName: "Price", flex: 0.2 },
    ...(isDashboard ? [] :

      [{ field: "title", headerName: "Course title", flex: 0.7 },
      { field: "userEmail", headerName: "Email", flex: 0.6 },
      {
        field: "toMail", headerName: "Email to", flex: 0.2,
        renderCell: (params: any) => {
          return (
            <a href={`mailto:${params.row.userEmail}`}>
              <IconButton>
                <AiOutlineMail size={20} className='dark:text-white text-black' />
              </IconButton>
            </a>
          )
        }
      }]
    ),
    { field: "created_at", headerName: "Created At", flex: 0.4 },
  ]

  const rows: any = []
  {
    getAllOrders && getAllOrders?.orders?.forEach((item: any, index: number) => {
      rows.push({
        id: item?._id,
        title: item.title,
        userName: item.userName,
        userEmail: item.userEmail,
        price: `${item.price}$`,
        created_at: format(item.createdAt)
      })
    })
  }
  return (
    <div>
      {isLoading ? <DataLoader /> : <TableWrapper height={isDashboard ? "50vh" : ""}>
        <DataGrid checkboxSelection={isDashboard ? false : true} columns={columns} rows={rows}
          components={isDashboard ? {} : { Toolbar: GridToolbar }}
        />

      </TableWrapper>}
    </div>
  )
}

export default AllInvoices