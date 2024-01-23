import Head from "next/head";
import React, { FC } from "react";



interface HeadProps {
    title: string,
    description: string,
    keywords: string
}


const Heading: FC<HeadProps> = (props) => {

    const { title, description, keywords } = props

    return (
        <Head>
            <title>{title}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Head>
    )
}



export default Heading