import { Typography } from "@mui/material";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { GiCrossedSabres } from "react-icons/gi";
import { MenuItem } from "react-pro-sidebar";
import { useSelector } from "react-redux";
import noAvatar from "../../../public/noavatar.png";
import MenuItems from "./Icon";
import { FaHamburger } from "react-icons/fa";

import "./admin.css"
interface ItemProps {
    menu: {
        title: string;
        Icon: any;
        to: string;
    }[],
    label?: string,
    collapsed?: boolean,
    selected: string;
    setSelected: (selected: string) => void;
}

const Item: FC<ItemProps> = (props) => {
    const { selected, menu, collapsed,label, setSelected } = props;
    return (
        <div className="MenuItem">
           {!collapsed && <Typography className="py-2 px-5">{label}</Typography>}
            <div className="subMenu my-2">

                {
                    menu?.map(({ title, Icon, to }) => (
                        <Link key={title} href={to} onClick={() => setSelected(title)} className={`px-5 my-2 text-[12px] mt-4 flex gap-3 hover:text-[--t-blue] hover:scale-y-105 ${selected === title && "text-[--t-blue]"}`}>
                            <Icon />
                            {!collapsed && <span className="text-[16px]">{title}</span>}
                        </Link>

                    ))
                }
            </div>
        </div>
    );
};


interface SidebarProps {
collapsed:boolean,
setCollapsed:(collapsed:boolean) => void
}
const AdminSidebar: FC<SidebarProps> = (props) => {
    const {collapsed, setCollapsed} = props
    const { user } = useSelector((state: any) => state.auth);
    const [logout, setLogout] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [mounted, setMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return;
    }
    return (
        <div className={`sidebar fixed left-0 top-0 h-full transition-[width] duration-900 ${collapsed ? "w-[60px]" : "w-[280px] overflow-y-scroll"}`}>
   {   !collapsed ? <>      <div className="sidebarHeader mb-3">
                <div className="flex justify-between py-3 px-5 items-center gap-8">
                    <Typography component="h1" className="">
                        Compiler Academy
                    </Typography>
                    <GiCrossedSabres size={20} className="cursor-pointer hover:scale-x-110" onClick={()=> setCollapsed(true)}/>
                </div>
                <div className="flex py-2 gap-5 jus items-center px-5">
                    <div className="flex justify-center flex-col items-center gap-1">
                        <Image
                            src={user.avatar.url || noAvatar}
                            width={150}
                            height={150}
                            alt="profile-img"
                            className="w-[60px] h-[60px] rounded-full border-[3px] border-[#37a39a]"
                        />
                        {/* <Typography component="h1" className="">
              -Admin{" "}
            </Typography> */}
                    </div>
                    <Typography component="h1" className="">
                        Welcome, <br /> {user?.name}
                    </Typography>
                </div>
            </div>
            </> :  <FaHamburger onClick={()=> setCollapsed(false)} className="cursor-pointer hover:scale-x-110 hover:text-[--t-blue] mx-5 my-5" size={20}/>
                }
                <hr />
            <div className="sidebarMenu">
                {
                    MenuItems.map((item: any) => {
                        return <>
                            <Item key={item.label} collapsed={collapsed} label={item.label} menu={item.subMenu} selected={selected} setSelected={setSelected} />
                        </>
                    })
                }
            </div>
        </div>
    );
};


export default AdminSidebar;
