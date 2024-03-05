import { Box } from '@mui/material'
import { useTheme } from 'next-themes'
import React, { FC, ReactNode } from 'react'

type Props = {
    children?: ReactNode
}

const TableWrapper: FC<Props> = ({ children }) => {
    const { theme, setTheme } = useTheme()

    return (
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

            {children}
        </Box>
    )
}

export default TableWrapper