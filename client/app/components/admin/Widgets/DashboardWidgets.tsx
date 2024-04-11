import { CircularProgress, Grid } from '@mui/material'
import React from 'react'
import { FaMoneyBill } from 'react-icons/fa'
import WidgetCard from './WidgetCard'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import GroupIcon from '@mui/icons-material/Group';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MemoryIcon from '@mui/icons-material/Memory';
import OrderAnalytics from '../analytics/OrderAnalytics';
import UserAnalytics from '../analytics/UserAnalytics';
import AllInvoices from '../order/AllInvoices';
import { styles } from '@/app/styles/style';
type Props = {}

const DashboardWidgets = (props: Props) => {
    return (
        <div className='w-full mt-5'>
            <Grid container xs={12} display={"flex"} justifyContent={"space-around"} rowGap={2}>
                <Grid item lg={4} md={6} xs={12} px={2}>
                    <WidgetCard Icon={<LocalAtmIcon fontSize={"large"} color='warning' />} label='Earnings' value="500$" circleColor='warning' />
                </Grid>
                <Grid item lg={4} md={6} xs={12} px={2}>
                    <WidgetCard Icon={<GroupIcon fontSize={"large"} color='info' />} label='Users' value="200+" circleColor='info' />
                </Grid>
                <Grid item lg={4} md={6} xs={12} px={2}>
                    <WidgetCard Icon={<MemoryIcon fontSize={"large"} color='error' />} label='Orders' value="45+" circleColor='error' />
                </Grid>
            </Grid>
            <Grid container lg={12} mt={2}>
                <Grid item lg={6} xs={12}>
                    <OrderAnalytics isDashboard={true}/>
                </Grid>
                <Grid item lg={6} xs={12}>
                    <UserAnalytics isDashboard={true}/>
                </Grid>
                <Grid item lg={8} xs={12} mt={2}>
                    <h3 className={`${styles.title} text-start !text-[20px]`}>New Orders</h3>
                    <AllInvoices isDashboard={true}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardWidgets