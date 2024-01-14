import React, { FC } from 'react'

export const navItemsData =[
    { 
        name:"Home",
        url:"/",
    },
    
]

type Props = {
    activeItem: number,
    isMobile: boolean
}

const NavItems: FC<Props> = (props) => {
    return (
        <div></div>
    )
}

export default NavItems