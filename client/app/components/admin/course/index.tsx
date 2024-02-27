export { default as CreateCourse } from "./CreateCourse"
export { default as CourseInformation } from "./CourseInformation"
export { default as CourseOptions } from "./CourseOptions"
export { default as CourseData } from "./CourseData"
export { default as CourseContent } from "./CourseContent"
export { default as CoursePreview } from "./CoursePreview"
export { default as CoursePlayer } from "./CoursePlayer"

type Props = {
    nextTitle?: string,
    prevTitle?: string,
    handleNext?: any
    handlePrev?: () => void
}

export const NextButton = (props: Props) => {
    const { nextTitle, prevTitle, handleNext, handlePrev } = props
    return <div className={`w-full flex ${prevTitle && nextTitle ? "justify-between" : "justify-end"} mb-10`}>

        {prevTitle && <button onClick={() => handlePrev?.()} className='text-white bg-[--t-blue] rounded mt-8 cursor-pointer w-full 800px:w-[150px] h-[40px]' >{prevTitle}</button>}
        {nextTitle && <button onClick={() => handleNext?.()} className='text-white bg-[--t-blue] rounded mt-8 cursor-pointer w-full 800px:w-[150px] h-[40px]' >{nextTitle}</button>}
    </div>
}