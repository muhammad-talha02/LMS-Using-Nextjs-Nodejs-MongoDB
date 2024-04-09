import { styles } from '@/app/styles/style';
import { useGetCourseAnalyticsQuery } from '@/redux/features/analytics/analyticsApi';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Label, LabelList, ResponsiveContainer } from 'recharts';

type Props = {}

const CourseAnalytics = (props: Props) => {

    const { data: courseAnalytics, isLoading } = useGetCourseAnalyticsQuery({})

    const analyticsData:any = []
    const graphData = [
        {
            name: "June", uv: 5,
        },
        {
            name: "July", uv: 6,
        },
        {
            name: "Aug", uv: 2,
        },
        {
            name: "Sep", uv: 2,
        },
        {
            name: "October", uv: 2,
        },
    ]


    courseAnalytics && courseAnalytics?.AnalyticsData?.last12Months?.forEach((element: any) => {
        analyticsData.push({ name: element.month, uv: element.count })
    });
    const minValue = 0
    return (
        <div className='h-screen'>
            <div>

                <h1 className={`${styles.title}`}>Courses Analytics</h1>
                <p className='text-center'>Last 12 Months analytics data</p>
            </div>
            <div className="w-full mt-5">
                {/* <ResponsiveContainer width="100%" height="50%">
                    <BarChart width={150} height={40} data={graphData}>
                        <Bar dataKey="uv" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer> */}
                <ResponsiveContainer width={"90%"} height={500}>
                    <BarChart width={150} height={300} data={analyticsData}>
                        <XAxis dataKey={"name"}>
                            <Label offset={0} position={"insideBottom"} />
                        </XAxis>
                        <YAxis domain={[minValue, 5]} />
                        <Bar dataKey={"uv"} fill='#3faf82'>
                            <LabelList dataKey={"uv"} position={"top"} />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default CourseAnalytics