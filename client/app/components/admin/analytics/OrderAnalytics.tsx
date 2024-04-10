import { styles } from '@/app/styles/style'
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React, { FC } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
type Props = {
    isDashboard?: boolean
}

const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
    const { data: ordersAnalyticsData, isLoading } = useGetOrdersAnalyticsQuery({})

    const analyticsData: any = [
        
    ]
    ordersAnalyticsData && ordersAnalyticsData?.AnalyticsData?.last12Months?.forEach((element: any) => {
        analyticsData.push({ name: element.month, count: element.count })
    });
    return (
        <div className={`w-full`}>
            <div>

                <h1 className={`${styles.title} ${isDashboard && "!text-[20px] !text-start"}`}>Orders Analytics</h1>
                {!isDashboard && <p className='text-center'>Last 12 Months analytics data</p>}
            </div>
            <div className={`w-full mt-5 ${isDashboard ? "h-screen" : "h-[30vh]"}`}>

                <ResponsiveContainer width={isDashboard ? "50%" : "90%"} height={isDashboard ? 225 : 500}>
                    <LineChart width={500} height={300} data={analyticsData} margin={{
                        top: 5,
                        left: 20,
                        right: 30,
                        bottom: 5
                    }}>
                        <CartesianGrid strokeDasharray={"3 3"} />
                        <XAxis dataKey={"name"} />
                        <YAxis />
                        <Tooltip />
                        {!isDashboard && <Legend />}
                        <Line dataKey={"count"} type={"monotone"} stroke='#82ca9d' />

                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default OrderAnalytics