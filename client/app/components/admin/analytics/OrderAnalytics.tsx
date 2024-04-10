import { styles } from '@/app/styles/style'
import { useGetOrdersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React, { FC } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
type Props = {
    isDashboard?: boolean
}



const OrderAnalytics: FC<Props> = ({ isDashboard }) => {
    const { data: courseAnalytics, isLoading } = useGetOrdersAnalyticsQuery({})

    const analyticsData: any = []
    courseAnalytics && courseAnalytics?.AnalyticsData?.last12Months?.forEach((element: any) => {
        analyticsData.push({ name: element.month, uv: element.count })
    });
    return (
        <div className={`w-full`}>
            <div>

                <h1 className={`${styles.title} ${isDashboard && "!text-[20px] !text-start"}`}>Users Analytics</h1>
                {!isDashboard && <p className='text-center'>Last 12 Months analytics data</p>}
            </div>
            <div className={`w-full mt-5 ${isDashboard ? "h-screen" : "h-[30vh]"}`}>

                <ResponsiveContainer width={isDashboard ? "50%" : "90%"} height={isDashboard ? 225 : 500}>
                    <AreaChart width={150} height={300} data={analyticsData}>
                        <XAxis dataKey={"name"} />
                        <YAxis />
                        <Area dataKey={"count"} type={"monotone"} stroke='#4f62d9' fill='#4f62d9' />

                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default OrderAnalytics