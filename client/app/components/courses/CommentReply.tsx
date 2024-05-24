import React from 'react'

type Props = {
    courseContentData: any,
    activeVideo: any,
    answer: any,
    setAnswer: (answer: string) => void,
    user: any,
    setAnswerId: (answerId: any) => void
}

const CommentReply = (props: Props) => {
    return (
        <div>CommentReply</div>
    )
}

export default CommentReply