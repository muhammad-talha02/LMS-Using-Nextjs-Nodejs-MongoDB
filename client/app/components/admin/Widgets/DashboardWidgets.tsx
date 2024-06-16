import { styles } from '@/app/styles/style';
import { useGetAllOrdersQuery } from '@/redux/features/orders/orderApi';
import { useGetAllUsersQuery } from '@/redux/features/user/userApi';
import GroupIcon from '@mui/icons-material/Group';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import MemoryIcon from '@mui/icons-material/Memory';
import { Grid } from '@mui/material';
import OrderAnalytics from '../analytics/OrderAnalytics';
import UserAnalytics from '../analytics/UserAnalytics';
import AllInvoices from '../order/AllInvoices';
import WidgetCard from './WidgetCard';

const DashboardWidgets = () => {
    const {data:AllOrdersData } = useGetAllOrdersQuery({}, { refetchOnMountOrArgChange: true })
    const {data:AllUsersData } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true })
    const usersCount = AllUsersData?.users ? AllUsersData?.users?.length + "+" : "..."
    const ordersCount = AllOrdersData?.orders ? AllOrdersData?.orders?.length + "+" : "..."
    const earningsCount = AllOrdersData?.orders ?  "25500$" : "..."
    return (
        <div className='w-full mt-5'>
            <Grid container display={"flex"} justifyContent={"space-around"} rowGap={2}>
                <Grid item lg={4} md={6} xs={12} px={2}>
                    <WidgetCard Icon={<LocalAtmIcon fontSize={"large"} color='warning' />} label='Earnings' value={earningsCount}circleColor='warning' />
                </Grid>
                <Grid item lg={4} md={6} xs={12} px={2}>
                    <WidgetCard Icon={<GroupIcon fontSize={"large"} color='info' />} label='Users' value={usersCount} circleColor='info' />
                </Grid>
                <Grid item lg={4} md={6} xs={12} px={2}>
                    <WidgetCard Icon={<MemoryIcon fontSize={"large"} color='error' />} label='Orders' value={ordersCount} circleColor='error' />
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid item lg={6} xs={12}>
                    <OrderAnalytics isDashboard={true} />
                </Grid>
                <Grid item lg={6} xs={12}>
                    <UserAnalytics isDashboard={true} />
                </Grid>
                <Grid item lg={8} xs={12} mt={2}>
                    <h3 className={`${styles.title} text-start !text-[20px]`}>New Orders</h3>
                    <AllInvoices isDashboard={true} />
                </Grid>
            </Grid>
        </div>
    )
}

export default DashboardWidgets