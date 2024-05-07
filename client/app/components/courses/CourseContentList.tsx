import { FC, useState } from "react"

type Props = {
    courseData: any,
    activeVideo?: boolean,
    setActiveVideo?: any,
    isDemo?: boolean
}

const CourseContentList: FC<Props> = (props) => {
    const { courseData, isDemo } = props
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>())

    //? Find Unique Video Sections
    const videoSections: string[] = [...new Set<string>(courseData?.map((item: any) => item.videoSection))]
    const totalCount: number = 0;  //? Total No of Videos from Previous Section

    const toggleSection = (section: string) => {
        const newVisibleSections = new Set(visibleSections)
        if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section)
        }
        else {
            newVisibleSections.add(section)
        }

        setVisibleSections(newVisibleSections)
    }

    return (
        <div className={`w-full mt-4 ${isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
{
    
}
        </div>
    )
}

export default CourseContentList