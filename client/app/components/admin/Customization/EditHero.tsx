import { useGetLayoutQuery } from '@/redux/features/layout/layoutApi'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'

type Props = {}

const EditHero: FC<Props> = (props) => {
    const [imgUrl, setImgUrl] = useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')

    //? -- Get Layout API

    const { data: getBannerData, isLoading, isSuccess } = useGetLayoutQuery("Banner", { refetchOnMountOrArgChange: true })
    console.log("banner", getBannerData)

    useEffect(() => {
        if (isSuccess && getBannerData) {
            setTitle(getBannerData?.title)
            setSubTitle(getBannerData?.subTitle)
            setTitle(getBannerData?.banner?.image?.url)
        }
    }, [isSuccess, getBannerData])
    const imageHandler = (e: any) => {

        const fileReader = new FileReader()
        console.log(fileReader)
        fileReader.onload = () => {
            // if (fileReader.readyState === 2) {
            //     console.log(fileReader)
            //     UpdateAvatar({
            //         avatar: fileReader.result
            //     })
            // }
        }
        fileReader.readAsDataURL(e.target.files[0])

    }

    return (
        <>
         <div className='w-full flex items-center justify-center flex-col mt-10'>
            <div className="profileImg">
                <div className="imgBox relative">
                    <label htmlFor='profileImg'>
                        <Image src={`https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=1783&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`} width={150} height={150} alt='profile-img' className='md:w-[350px] md:h-[350px] w-[150px] h-[150px] rounded-full border-[3px] border-[#37a39a]' />
                        <div className='dark:bg-[#0b0f19] bg-white  w-[35px] border-[3px] border-[#37a39a] h-[35px] flex justify-center items-center rounded-full absolute bottom-[0px] right-[100px]'>
                            <AiOutlineCamera size={20} className='dark:text-white text-black' />

                        </div>
                    </label>
                    <input type="file" id='profileImg' className='hidden absolute top-0 left-0 w-[100px] h-[100px]' accept='image/png, image/jpeg, image/jpg, image/webp' onChange={imageHandler} />
                </div>
                <div className="userInfo">

                </div>
            </div>
            
        </div>
</>
    )
}

export default EditHero