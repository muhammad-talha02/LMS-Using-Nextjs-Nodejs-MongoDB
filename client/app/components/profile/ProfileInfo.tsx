import Image from 'next/image'
import React from 'react'
import noAvatar from "../../../public/noavatar.png"
import { AiOutlineCamera } from 'react-icons/ai';
import { styles } from '@/app/styles/style';
type Props = {
    user:any,
    avatar:any
}

const ProfileInfo = (props: Props) => {
    return (
        <div className='w-full flex items-center justify-center flex-col'>
            <div className="profileImg">
                <div className="imgBox relative">
                    <Image src={noAvatar} alt='profile-img' className='w-[100px] h-[100px] rounded-full border-[3px] border-[#37a39a]' />
                    <div className='dark:bg-[#0b0f19] bg-white  w-[25px] border-[3px] border-[#37a39a] h-[25px] flex justify-center items-center rounded-full absolute bottom-[4px] right-[8px]'>
                        <AiOutlineCamera size={15} className='dark:text-white text-black' />

                    </div>
                </div>
                <div className="userInfo">

                </div>
            </div>
            <form className='flex flex-col w-full max-w-[400px]'>
                <div className='my-2'>
                    <label htmlFor="fullName" className={`${styles.label}`}>Full Name: </label>
                    <input type='text' className={`${styles.input}`} name='fullName' id='fullName' />
                </div>
                <div className='my-2'>
                    <label htmlFor="email" className={`${styles.label}`}>Email: </label>
                    <input type='email' className={`${styles.input}`} name='email' id='email' />
                </div>
            </form>
        </div>
    )
}

export default ProfileInfo