import React, {useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import {BiHistory, BiLogOut, BiSolidDashboard} from 'react-icons/bi'
import {FaUsers} from 'react-icons/fa'
import {GiWallet} from 'react-icons/gi'
import {IoMdMail, IoMdSettings} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Sidenav = ({showsidenav, setshowsidenav}) => {
  const showref = useRef(null)

  const navigate = useNavigate();
  const linkStyles = {
    color: '#EFF2F9',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '10px',
    display: 'flex',
    justifyContent: 'spaceBetween',
    alignItems: 'center'
  };
  const handleLogout = () => {
    localStorage.removeItem('token'); 
    window.location.href = '/login';
  };
   const handlenotify = () =>{
    const token = localStorage.getItem("token");
    try {
        axios.post("https://ajo-backend.onrender.com/user/update",
        {isread: true},
        {
            headers:{
                Authorization: `bearer ${token}`
            }
        }).then((res)=>{
            console.log(res);
            navigate('/dashboard/message') 
        }).catch((err)=>{
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
   }
    const closesidenav = () =>{
      setshowsidenav(false)
    }
    // useEffect(() => {
    //   const handleClickOutside = (event) =>{
    //     if (showref.current && !showref.current.contains(event.target)) {
    //       setshowsidenav(false)
    //     }
    //   }
    //     document.addEventListener("mousedown", handleClickOutside);
    //   return () => {
    //     document.removeEventListener("mousedown", handleClickOutside)
    //   }
    // }, [showref])
    
  return (
    <>
      <div ref={showref} className={showsidenav? 'side-visible' : 'side'}>
        <div className='logo'>
           <img  className='img-fluid w-100' src={require('./unity (1).png')} alt="" />
        </div>
        <div className='down mt-5'>
        <div className='cont-side'>
          <Link onClick={closesidenav} to="/dashboard" style={linkStyles}><h1 className='fs-5 px-2'><BiSolidDashboard/></h1>  <h1 className='fs-5 fw-semibold'>Dashboard</h1></Link>
        </div>
        <div onClick={closesidenav} className='cont-side'>
          <Link  to="group" style={linkStyles}>
            <h1 className='fs-5 px-2'><FaUsers/></h1>
             <h1 className='fs-5 fw-semibold text-start'>Groups</h1>
          </Link>
        </div>
        <div onClick={closesidenav} className='cont-side'>
          <Link to="wallet" style={linkStyles}> <h1 className='fs-5 px-2'><GiWallet/></h1>  <h1 className='fs-5 fw-semibold text-start'>Fund Wallet</h1></Link>
        </div>
        <div onClick={closesidenav} className='cont-side'>
          <Link  onClick={handlenotify} style={linkStyles}> <h1 className='fs-5 px-2'><IoMdMail/></h1>  <h1 className='fs-5 fw-semibold text-start'>Notifications</h1></Link>
        </div>
        <div onClick={closesidenav} className='cont-side'>
          <Link to="" style={linkStyles}><h1 className='fs-5 px-2'><BiHistory/></h1> <h1 className='fs-5 fw-semibold text-start'>Track payments</h1></Link>
        </div>
        <div onClick={closesidenav} className='cont-side'>
          <Link to="" style={linkStyles}> <h1 className='fs-5 px-2'><IoMdSettings/></h1>  <h1 className='fs-5 fw-semibold text-start'>Settings</h1></Link>
        </div>
        <div onClick={closesidenav} className='cont-side'>
          <Link to="" onClick={handleLogout} style={linkStyles}><h1 className='fs-5 px-2'><BiLogOut/></h1> <h1 className='fs-5 fw-semibold text-start'>Logout</h1></Link>
        </div>
        </div>
      </div>
    </>
  )
}

export default Sidenav