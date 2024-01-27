import React, { FC } from 'react'

interface ItemProps  {
    item:string,
    icon:JSX.Element,
    to:string,
    selected:string,
    setSelected:(selected:string) => void
}

const AdminSidebar:FC<ItemProps> = (props) => {
    return (
        <div>AdminSidebar</div>
    )
}

export default AdminSidebar