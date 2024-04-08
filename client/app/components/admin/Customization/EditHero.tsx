import { useGetLayoutQuery, useUpdateLayoutMutation } from '@/redux/features/layout/layoutApi'
import Image from 'next/image'
import Link from 'next/link'
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { AiOutlineCamera } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { InputField } from '../../form'
import { Button } from '@mui/material'
import useMutation from '@/app/_hooks/useMutation'

type Props = {}

const EditHero: FC<Props> = (props) => {
    const [imgUrl, setImgUrl] = useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')

    //? -- Get Layout API

    const { data: getBannerData, isLoading, isSuccess, refetch } = useGetLayoutQuery("Banner", { refetchOnMountOrArgChange: true })
    console.log("banner", getBannerData)


    //? Update Layout APi
    const { actionApi: updateBannerAction, result } = useMutation({
        api: useUpdateLayoutMutation,
        successMsg: "Banner Data Updated",
        successFunc: () => {
            refetch()
        }
    })


    //? UseEffect for set Initial Values
    useEffect(() => {
        if (isSuccess && getBannerData) {
            const layout = getBannerData?.layout.banner
            setTitle(layout?.title)
            setSubTitle(layout?.subTitle)
            setImgUrl(layout?.image?.url)
        }
    }, [isSuccess, getBannerData])

    //? Image Handler to Send Data as URL
    const imageHandler = (e: any) => {

        const file = e?.target?.files[0]
        if (file) {
            const fileReader = new FileReader()

            fileReader.onload = (e: any) => {

                if (fileReader.readyState === 2) {

                    setImgUrl(e.target.result as string)
                }
            }
            fileReader.readAsDataURL(file)
        }

    }

    console.log("img", imgUrl)

    const isDisableUpdate = () => {
        const layout = getBannerData?.layout.banner

        if (layout?.title === title && layout?.subTitle === subTitle && layout?.image?.url === imgUrl) {
            return true
        }
        else {
            return false
        }
    }


    const handleUpdateLayout = async () => {
        const data = {
            type: "Banner",
            image: imgUrl,
            title: title,
            subTitle: subTitle
        }
        await updateBannerAction(data)
    }

    return (
        <>
            <div className='w-full flex flex-col 800px:flex-row items-center justify-center gap-10 mt-10'>
                <div className="profileImg">
                    <div className="imgBox relative">
                        <label htmlFor='profileImg'>
                            <Image src={imgUrl} width={150} height={150} alt='profile-img' className='800px:w-[300px] 800px:h-[300px] w-[150px] h-[150px] rounded-full border-[3px] border-[#37a39a]' />
                            <div className='dark:bg-[#0b0f19] bg-white  w-[35px] border-[3px] border-[#37a39a] h-[35px] flex justify-center items-center rounded-full absolute bottom-[0px] right-[100px]'>
                                <AiOutlineCamera size={20} className='dark:text-white text-black' />

                            </div>
                        </label>
                        <input type="file" id='profileImg' className='hidden absolute top-0 left-0 w-[100px] h-[100px]' accept='image/png, image/jpeg, image/jpg, image/webp' onChange={imageHandler} />
                    </div>

                </div>
                <div className="flex flex-col gap-8">
                    <textarea className='text-[40px] leading-tight bg-transparent resize-none' rows={5} value={title} onChange={(e) => setTitle(e.target.value)}></textarea>

                    <textarea className='text-[14px] bg-transparent resize-none' rows={3} value={subTitle} onChange={(e) => setSubTitle(e.target.value)} ></textarea>
                    <div className='flex justify-center'>
                <button className='text-white bg-[--t-blue] rounded mt-8 cursor-pointer w-full 400px:w-[150px] h-[40px] disabled:cursor-not-allowed' disabled={result.isLoading || isDisableUpdate()} onClick={handleUpdateLayout}>Update</button>
            </div>

                </div>

            </div>
           
        </>
    )
}

export default EditHero