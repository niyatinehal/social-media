import React, { useContext } from 'react'
import { MainContext } from '../../services/contexts/MainContext'

export const UserProfile = () => {
  const{mainState}=useContext(MainContext);
  console.log("userPrifile",mainState.userProfile.fName)
  return (
    <div>
      <div>
        <p><strong>Name: </strong>{mainState.userProfile.fName}{" "}{mainState.userProfile.lName}</p>
      </div>
    </div>
  )
}
