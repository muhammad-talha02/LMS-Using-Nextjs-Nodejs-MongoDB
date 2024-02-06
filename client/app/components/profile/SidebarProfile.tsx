import Image from 'next/image'
import React, { FC } from 'react'
import noAvatar from "../../../public/noavatar.png"
import { RiLockPasswordLine } from 'react-icons/ri'
import { SiCoursera } from 'react-icons/si'
import { AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'
type Props = {
    user: any,
    active: number,
    setActive: (active: number) => void
    avatar: string | null,
    logoutHandler: any
}

const SidebarProfile: FC<Props> = (props) => {

    const { active, setActive, avatar, logoutHandler, user } = props
    return (
        <div className='w-full'>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => setActive(1)}
            >

                <Image src={user?.avatar?.url || avatar || noAvatar} width={150} height={150} className='w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] rounded-full cursor-pointer' alt='Avatar' />
                <h5 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'>
                    My Account
                </h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine size={20}  className='text-black dark:text-white' />
                <h5 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'>
                    Change Password
                </h5>
            </div>
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => setActive(3)}
            >
                <SiCoursera size={20}  className='text-black dark:text-white'  />
                <h5 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'>
                    Enrolled Courses
                </h5>
            </div>
            {
                user.role === "admin" &&
                <Link href={"/dashboard"} className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                    onClick={() => setActive(6)}
                >
                    <MdOutlineAdminPanelSettings size={20}  className='text-black dark:text-white'  />
                    <h5 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'>
                        Admin Dashboard
                    </h5>
                </Link>
            }
            <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-white" : "bg-transparent"}`}
                onClick={() => logoutHandler()}
            >
                <AiOutlineLogout size={20} className='text-black dark:text-white' />
                <h5 className='pl-2 800px:block hidden font-Poppins text-black dark:text-white'>
                    Logout
                </h5>
            </div>
        </div>
    )
}

export default SidebarProfile