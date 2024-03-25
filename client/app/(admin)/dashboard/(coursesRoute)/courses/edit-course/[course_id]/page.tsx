'use client'
import EditCourse from '../../../../../../components/admin/course/EditCourse'
type Props = {}

const EditCoursePage = ({params}:any) => {
const courseId = params.course_id
  return (
    <EditCourse courseId={courseId}/>
  )
}

export default EditCoursePage