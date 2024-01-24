import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import noAvatar from "../../../public/noavatar.png"
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '@/app/styles/style';
import { useUpdateAvatarMutation } from '@/redux/features/user/userApi';
import toast from 'react-hot-toast';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';


type Props = {
    user: any,
    avatar: string | null
}


const ProfileInfo: FC<Props> = ({ user, avatar }) => {
    const [profileName, setProfileName] = useState(user && user.name)
    const [loadUser, setLoadUser] = useState(false)
    const [updateAvatar, result] = useUpdateAvatarMutation()
    const { } = useLoadUserQuery(undefined, { skip: !loadUser })
    const imageHandler = (e: any) => {

        const file = e.target.files[0]
        const fileReader = new FileReader()
        console.log(fileReader)
        fileReader.onload = () => {
            if (fileReader.readyState === 2) {
                console.log(fileReader)
                updateAvatar({
                    avatar: fileReader.result
                })
            }
        }
        fileReader.readAsDataURL(e.target.files[0])

    }
    useEffect(() => {
        if (result.isSuccess) {
            setLoadUser(true)
            toast.success("Updated Sucessfully")
        }
        if (result.error) {
            console.log("Error ->", result.error)
        }
    }, [result.isSuccess, result.error])

    const handleSubmit = () => {

    }



    return (
        <div className='w-full flex items-center justify-center flex-col'>
            <div className="profileImg">
                <div className="imgBox relative">
                    <label htmlFor='profileImg'>
                        <Image src={user.avatar.url || avatar || noAvatar} width={150} height={150} alt='profile-img' className='w-[100px] h-[100px] rounded-full border-[3px] border-[#37a39a]' />
                        <div className='dark:bg-[#0b0f19] bg-white  w-[25px] border-[3px] border-[#37a39a] h-[25px] flex justify-center items-center rounded-full absolute bottom-[4px] right-[8px]'>
                            <AiOutlineCamera size={15} className='dark:text-white text-black' />

                        </div>
                    </label>
                    <input type="file" id='profileImg' className='hidden absolute top-0 left-0 w-[100px] h-[100px]' accept='image/png, image/jpeg, image/jpg, image/webp' onChange={imageHandler} />
                </div>
                <div className="userInfo">

                </div>
            </div>
            <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-[400px]'>
                <div className='my-2'>
                    <label htmlFor="fullName" className={`${styles.label}`}>Full Name: </label>
                    <input type='text' value={profileName} onChange={(e) => setProfileName(e.target.value)} className={`${styles.input}`} name='fullName' id='fullName' />
                    {profileName.length < 6 && <small className='text-red-600'>name must be at least 6</small>}
                </div>
                <div className='my-2'>
                    <label htmlFor="email" className={`${styles.label}`}>Email: </label>
                    <input type='email' className={`${styles.input} dark:disabled:opacity-70 disabled:bg-white-900 disabled:text-gray-300`} value={"talha@gmail.com"} name='email' id='email' disabled={true} readOnly />
                </div>
                <button className='w-full 800px:w-[130px] py-2 my-3 border-2 border-[--t-blue] hover:opacity-80'>Update</button>
            </form>
        </div>
    )
}

export default ProfileInfo