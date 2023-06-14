import React, { useContext } from 'react'
import { MainContext } from '../../services/contexts/MainContext'

export const UserProfile = () => {
  const{mainState}=useContext(MainContext);
  console.log("userPrifile",mainState.loggedInUser)
  return (
    <div>
      <div>
        <p><strong>Name: </strong>{mainState.loggedInUser.fName}{" "}{mainState.loggedInUser.lName}</p>
      </div>
    </div>
  )
}
