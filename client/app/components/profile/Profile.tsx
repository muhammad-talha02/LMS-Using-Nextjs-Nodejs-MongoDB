
"use client"
import React, { FC, useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogoutQuery } from '@/redux/features/auth/authApi'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'

type Props = {
  user: any
}

const Profile: FC<Props> = ({ user }) => {

  const [scroll, setScroll] = useState(false)
  const [active, setActive] = useState(1)
  const [avatar, setAvatar] = useState(null)
  const [logout, setlogout] = useState(false)

  const { data } = useSession()


  const { } = useLogoutQuery(undefined, {
    skip: !logout
  })


  const logoutHandler = async () => {
    setlogout(true);
    if (data !== null) {
      await signOut()
    }
    // toast.success("Logout Sucessfully")
  }



  if (typeof window !== undefined) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true)
      }
      else {
        setScroll(false)
      }
    })
  }
  return (
    <div className='w-[85%] flex mx-auto'>
      <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90 border dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"}`}>

        <SidebarProfile user={user} active={active} setActive={setActive} avatar={avatar} logoutHandler={logoutHandler} />
      </div>
      <div className="w-full my-[80px]">

        {
          active === 1 && <ProfileInfo user={user} avatar={avatar}/>
        }
        {
          active === 2&& <ChangePassword/>
        }
      </div>
    </div>
  )
}

export default Profile