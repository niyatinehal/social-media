import React from 'react'
import { useContext } from 'react'
import { MainContext } from '../../services/contexts/MainContext'

export const Explore = () => {
  const{mainState}=useContext(MainContext)
  console.log(mainState.posts)
  return (
    <div>
      <div>
        {mainState.posts.map((post)=>(
          <li>
          <h3>{post.username}</h3>
          {post.content}</li>
        ))}
      </div>
    </div>
  )
}
