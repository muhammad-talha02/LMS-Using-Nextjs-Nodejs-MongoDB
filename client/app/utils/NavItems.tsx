import Link from 'next/link'
import React, { FC } from 'react'

export const navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Policy",
        url: "/policy",
    },
    {
        name: "FAQ",
        url: "/faq",
    },

]

type Props = {
    activeItem: number,
    isMobile: boolean
}

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="hidden 800px:flex">
                {
                    navItemsData?.map((item, index) => (
                        <Link href={`${item.url}`} key={item.name}>
                            <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-Poppins font-[400]`}>

                                {item.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
            {
                isMobile && (
                    <div className="800px:hidden mt-5">
                                                <div className='py-6 text-center w-full'>
                            <Link
                                href={"/"}
                                className="text-[25px] font-Poppins font-500 text-black dark:text-white"
                            >
                                Compile Academy
                            </Link>
                        </div>
                        {/* <div className="w-full text-center py-6"> */}
                            {navItemsData &&
                                navItemsData?.map((item, index) => (
                                    <Link href={`${item.url}`} key={item.name}>
                                        <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} py-6 block text-[18px] px-6 font-Poppins font-[400]`}>

                                            {item.name}
                                        </span>
                                    </Link>
                                ))
                            }
                        </div>
                    // </div>
                )
            }
        </>
    )
}

export default NavItems