import React from 'react'

type Props = {
    children?: React.ReactNode,
    classes?: string
}

export const H1 = (props: Props) => {

    const { children, classes } = props
    return (
        <h1 className={`dark:text-white text-black font-bold ${classes ? classes : "text-3xl"}`}>
            {
                children
            }
        </h1>
    )
}

