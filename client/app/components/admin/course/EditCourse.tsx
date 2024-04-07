import { useGetSingleCourseAdminQuery, useUpdateCourseMutation } from '@/redux/features/courses/coursesApi'
import { FC, useEffect, useState } from 'react'
import { CourseContent, CourseData, CourseInformation, CourseOptions, CoursePreview } from '.'
import useMutation from '../../../_hooks/useMutation'
import { useRouter } from 'next/navigation'
type Props = {
    courseId: string
}

const EditCourse: FC<Props> = (props) => {
const router = useRouter()
    const { courseId } = props

    //? -- Get Single Course API
    const { data: singleCourseData, isLoading, isSuccess } = useGetSingleCourseAdminQuery(courseId, {refetchOnMountOrArgChange:true})

    //? -- Update Course Mutation
    const { actionApi: UpdateCourse, result } = useMutation({
        api: useUpdateCourseMutation,
        successMsg: "Course Updated Successfully",
        successFunc:()=>{
            router.push("/dashboard/courses")
        }
    })

console.log("data", singleCourseData)


    const [active, setActive] = useState(0)
    const [benefits, setBenefits] = useState([{ title: "Problem" }])
    const [prerequisites, setPrerequisites] = useState([{ title: "JavaScipt" }])
    const [courseData, setCourseData] = useState({})
    const [courseContentData, setCourseContentData] = useState([{
        videoUrl: "28cc1a193de242e2ab56471d0cb51aa4",
        title: "Introduction",
        description: "dd",
        videoSection: "Untitled Section",
        links: [
            {
                title: "MyGitHub",
                url: 'https://github.com/muhammad-talha02/'
            }
        ],
        // suggestions: ""
    }])

    const [courseInfo, setCourseInfo] = useState({
        name: "MERN Stack Advanced Course",
        description: "Hey, DO you want to Enhance your skills in Full Stack Development",
        price: 1500,
        estimatedPrice: 2000,
        tags: "react",
        levels: "Advanced",
        demoUrl: "1a92588781a7d1f226c934e795dfba50",
        thumbnail: ""
    })


    const handleSubmit = () => {
        // Format Benefits Array

        const fomatBenefits = benefits.map((benefit: any) => ({ title: benefit.title }))
        // Format Prequesities Array

        const fomatPrequisities = prerequisites.map((prerequisite: any) => ({ title: prerequisite.title }))

        // Format Course Content Data 

        const formatCourseContentData = courseContentData?.map((courseContent: any) => ({
            videoUrl: courseContent.videoUrl,
            title: courseContent.title,
            description: courseContent.description,
            videoSection: courseContent.videoSection,
            links: courseContent.links.map((link: any) => ({
                title: link.title,
                url: link.url,
            })),
            // suggestions: courseContent.suggestions
        }))

        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.levels,
            demoUrl: courseInfo.demoUrl,
            thumbnail: courseInfo.thumbnail,
            totalVideos: courseContentData.length,
            benefits: fomatBenefits,
            prequesities: fomatPrequisities,
            courseData: formatCourseContentData
        }

        setCourseData(data)
    }

    const handleCourseUpdate = async () => {
        const data = courseData
        if (!result.isLoading) {
            await UpdateCourse({ data, id: courseId })
        }
        console.log("Course Data", courseData)
    }


    useEffect(()=>{
if(isSuccess && singleCourseData){
    setCourseInfo({
        name: singleCourseData?.course?.name,
        description: singleCourseData?.course?.description,
        price: singleCourseData?.course?.price,
        estimatedPrice: singleCourseData?.course?.estimatedPrice,
        tags: singleCourseData?.course?.tags,
        levels: singleCourseData?.course?.level,
        demoUrl: singleCourseData?.course?.demourl,
        thumbnail: singleCourseData?.course?.thumbnail
    })
    setBenefits(singleCourseData?.course?.benefits)
    setPrerequisites(singleCourseData?.course?.prequesities)
    const courseData = singleCourseData?.course?.courseData?.map((item:any)=>{
        const {_id, ...obj} = item
        return obj
    })
    setCourseContentData(courseData)
}
    }, [isSuccess, singleCourseData])
    if (isLoading) return "Loading...."

    return (
        <div className='w-full'>
            <div className="w-[80%]">
                {
                    active === 0 && <CourseInformation
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        active={active}
                        setActive={setActive}
                    />
                }
                {
                    active === 1 && <CourseData
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
                        active={active}
                        setActive={setActive}
                    />
                }
                {
                    active === 2 && <CourseContent
                        courseContentData={courseContentData}
                        setCourseContentData={setCourseContentData}
                        active={active}
                        setActive={setActive}
                        handleSubmit={handleSubmit}
                    />
                }
                {
                    active === 3 && <CoursePreview
                        active={active}
                        setActive={setActive}
                        courseData={courseData}
                        handleCourseCreate={handleCourseUpdate}
                        isUpdate={true}
                    />
                }
            </div>
            <div className="w-[20%] mt-[100px] h-screen fixed top-12 right-0 z-[-1]">
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default EditCourse