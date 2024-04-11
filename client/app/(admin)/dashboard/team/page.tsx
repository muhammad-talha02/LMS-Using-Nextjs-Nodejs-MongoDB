import AllUsers from '@/app/components/admin/users/AllUsers'
import { styles } from '@/app/styles/style'
import React from 'react'

type Props = {}

const Teams = (props: Props) => {
  return (
    <>
      <h1 className={`${styles.title} mt-3`}>Manage Team</h1>
      <AllUsers isTeam={true} />
    </>

  )
}

export default Teams