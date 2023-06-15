import React, { useContext, useState } from 'react'
import { MainContext } from '../../services/contexts/MainContext'
import { AuthContext } from '../../services/HandlerContext/AuthFunc';

export const UserProfile = () => {
  const{mainState,loggedInUser}=useContext(MainContext);
  const{logout}=useContext(AuthContext);
  const[profile,setProfile]=useState(loggedInUser);
  console.log("userPrifile",profile)
  return (
    <div>
      <div>
      {/* <button onClick={(e)=>logout(e)}>Logout</button> */}
        <p><strong>Name: </strong>{loggedInUser.firstName}{" "}{loggedInUser.lastName}</p>
      </div>
    </div>
  )
}
