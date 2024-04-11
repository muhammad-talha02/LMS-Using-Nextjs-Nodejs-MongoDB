import React from 'react'
import DashboardHeader from './DashboardHeader/Header'
import DashboardWidgets from './Widgets/DashboardWidgets'

type Props = {
  isDashboard:boolean
}

const DashboardHero = ({isDashboard}: Props) => {
  return (
    <div className='px-3'>
      {
        isDashboard && <DashboardWidgets/>
      }
      {/* <DashboardHeader/> */}
    </div>
  )
}

export default DashboardHero