import { styles } from '@/app/styles/style'
import { useGetOrdersAnalyticsQuery, useGetUsersAnalyticsQuery } from '@/redux/features/analytics/analyticsApi'
import React, { FC } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
type Props = {
    isDashboard?: boolean
}

const UserAnalytics: FC<Props> = ({ isDashboard }) => {
    const { data: userAnalytics, isLoading } = useGetUsersAnalyticsQuery({})

    const analyticsData: any = []
    userAnalytics && userAnalytics?.AnalyticsData?.last12Months?.forEach((element: any) => {
        analyticsData.push({ name: element.month, count: element.count })
    });
    return (
        <div className={`w-full`}>
            <div>

                <h1 className={`${styles.title} ${isDashboard && "!text-[20px] !text-start"}`}>Users Analytics</h1>
                {!isDashboard && <p className='text-center'>Last 12 Months analytics data</p>}
            </div>
            <div className={`w-full mt-5 ${isDashboard ? "h-[30vh]" : "h-screen"}`}>

                <ResponsiveContainer width={"90%"} height={isDashboard ? 225 : 500}>
                    <AreaChart width={150} height={300} data={analyticsData}>
                        <XAxis dataKey={"name"} />
                        <YAxis />
                        <Tooltip/>
                        <Area dataKey={"count"} type={"monotone"} stroke='#4f62d9' fill='#4f62d9' />

                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default UserAnalytics