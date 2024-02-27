"use client"
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'

type Props = {
    videoUrl: any,
    title: string
}

const CoursePlayer: FC<Props> = ({ videoUrl = "1a92588781a7d1f226c934e795dfba50", title }) => {

    const [videoData, setVideoData] = useState({
        otp: '',
        playbackInfo: ''
    })
    console.log("Videoo Data", videoData)
    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}getVdoCipherOtp`, { videoId: videoUrl }).then((res) => {
            setVideoData(res.data)
        })
    }, [videoUrl])
    return (
        <div style={{ paddingTop: '41%', position: 'relative' }}>
            {
                videoData?.otp && videoData?.playbackInfo !== "" &&
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData?.playbackInfo}`}
                    // src="https://player.vdocipher.com/v2/?otp=20160313versASE323ixqQ6rprORNu7LLI7DLhH1fytHNDml1yaO8iWkmy3M5Pw1&playbackInfo=eyJ2aWRlb0lkIjoiMWE5MjU4ODc4MWE3ZDFmMjI2YzkzNGU3OTVkZmJhNTAifQ=="
                    style={{ border: 0, maxWidth: "100%", position: "absolute", top: 0, left: 0, height: "100%", width: "100%" }}
                    allowFullScreen={true} allow="encrypted-media"></iframe>
            }
        </div>
    )
}

export default CoursePlayer