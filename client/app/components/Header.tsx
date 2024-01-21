"use client";

import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "./ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "./Auth/Login";
import SignUp from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import noAvatar from "../../public/noavatar.png"
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    route: string;
    setRoute: (route: string) => void;
};

const Header: FC<Props> = (props) => {
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);
    const { open, setOpen, activeItem, route, setRoute } = props;

    // User from store

    const { user } = useSelector((state: any) => state.auth)

    const { data } = useSession()

    const [socialLogin, result] = useSocialAuthMutation()
    console.log("d", result.isSuccess)


    // Success or Error Message
    useEffect(() => {
        if (!user) {
            if (data) {
                socialLogin({
                    email: data?.user?.email,
                    name: data?.user?.name,
                    avatar: data?.user?.image,
                })
                console.log("Loginsndnn")
            }
        }
            if (result.isSuccess) {
                const message = result.data?.message
                toast.success(message || "Login Successfully")
                setOpen(false)
            }
        // if (result.error) {
        //     const errorData = result.error as any
        //     console.log(result)
        //     toast.error(`Error: ${errorData?.data.message}`)

        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, user])
    const handleSidebar = (e: any) => {
        if (e.target.id !== "screen") {
            setOpenSidebar(false);
        }
    };

    useEffect(() => {

        if (typeof window !== undefined) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 80) {
                    setActive(true);
                } else {
                    setActive(false);
                }
                console.log("Scroll -->", window.scrollY)
            });
        }
    }, [])
    return (
        <div className="w-full relative">
            <div
                className={`${active
                    ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500"
                    : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
                    }`}
            >
                <div className="w-[95%] 800px:w-[92%] max-w-[1200px] m-auto py-0 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link
                                href={"/"}
                                className="text-[25px] font-Poppins font-500 text-black dark:text-white"
                            >
                                Compile Academy
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems activeItem={activeItem} isMobile={false} />
                            <ThemeSwitcher />
                            {/* Only for mobile */}
                            <div className="800px:hidden">
                                <HiOutlineMenuAlt3
                                    size={25}
                                    className="cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpenSidebar(true)}
                                />
                            </div>
                            {
                                user ? (
                                    // <Link href={"/profile"}>
                                    <Image src={user.avatar ? user.avatar : noAvatar} width={30} height={30} alt="profile" className="cursor-pointer rounded-full" />
                                    // </Link>
                                ) : <HiOutlineUserCircle
                                    size={25}
                                    className="hidden 800px:block cursor-pointer dark:text-white text-black"
                                    onClick={() => setOpen(true)}
                                />
                            }

                        </div>
                    </div>
                </div>

                {/* Sidebar for mobile */}

                {openSidebar && <div className="w-full h-screen fixed top-0 left-0 z-[9999] dark:bg-unset bg-[#00000024]" onClick={handleSidebar}>

                    <div className="fixed w-[70%] z-[999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">


                        <NavItems activeItem={activeItem} isMobile={true} />
                        <HiOutlineUserCircle
                            size={25}
                            className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                            onClick={() => setOpen(true)}
                        />
                        <br />
                        <br />
                        <br />
                        <p className="text-[16px] px-2 pl-5 text-black dark:text-white">Copyright &copy; 2024. Compile Academy</p>
                    </div>


                </div>}
            </div>

            {
                route === "Login" && (
                    <>
                        {
                            open && (<CustomModal open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} Component={Login} />)
                        }
                    </>
                )
            }
            {
                route === "Sign-up" && (
                    <>
                        {
                            open && (<CustomModal open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} Component={SignUp} />)
                        }
                    </>
                )
            }
            {
                route === "Verification" && (
                    <>
                        {
                            open && (<CustomModal open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} Component={Verification} />)
                        }
                    </>
                )
            }
        </div>
    );
};

export default Header;
