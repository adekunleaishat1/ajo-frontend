import React from 'react'
import { Link } from 'react-router-dom'

const Group = () => {
  return (
    <>
        <div>
            <div className='bg_img '>

            </div>
            <div className='text-center mx-auto'><Link to="/dashboard/group/thrift" >+ Create a Thrift</Link></div>
        </div>
    </>
  )
}

export default Group