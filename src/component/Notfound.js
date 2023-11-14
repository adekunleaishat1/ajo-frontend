import React from 'react'
import { useNavigate } from 'react-router-dom'

const Notfound = () => {
    const navigate = useNavigate()
    const gohome = () =>{
      navigate('/')
    }
  return (
    <div>
        <div className='border-danger wrongpage'>
           <div className='wrongpagediv'>
           <h1 className='text-center mt-3 fs-1 fw-bold'>You are on the wrong page</h1>
           <button onClick={gohome} className='btn btn-danger text-center mt-5'>Go back Home</button>
           </div>
        </div>
    </div>
  )
}

export default Notfound