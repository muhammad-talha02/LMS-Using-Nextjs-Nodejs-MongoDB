export { default as CreateCourse } from "./CreateCourse"
export { default as CourseInformation } from "./CourseInformation"
export { default as CourseOptions } from "./CourseOptions"
export { default as CourseData } from "./CourseData"
export { default as CourseContent } from "./CourseContent"
export { default as CoursePreview } from "./CoursePreview"
export { default as CoursePlayer } from "./CoursePlayer"
export { default as AllCourses } from "./AllCourses"

type Props = {
    nextTitle?: string,
    prevTitle?: string,
    handleNext?: any,
    isLoading?: boolean,
    handlePrev?: () => void
}

export const NextButton = (props: Props) => {
    const { nextTitle, prevTitle, handleNext, handlePrev, isLoading } = props
    return <div className={`w-full flex ${prevTitle && nextTitle ? "justify-between" : "justify-end"} mb-10`}>

        {prevTitle && <button onClick={() => handlePrev?.()} className='text-white bg-[--t-blue] rounded mt-8 cursor-pointer w-full 800px:w-[150px] h-[40px] disabled:cursor-not-allowed' disabled={isLoading}>{prevTitle}</button>}
        {nextTitle && <button onClick={() => handleNext?.()} className='text-white bg-[--t-blue] rounded mt-8 cursor-pointer w-full 800px:w-[150px] h-[40px] disabled:cursor-not-allowed' disabled={isLoading}>{nextTitle}</button>}
    </div>
}