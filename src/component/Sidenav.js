import React from 'react'
import { Link } from 'react-router-dom'
import {BiHistory, BiLogOut, BiSolidDashboard} from 'react-icons/bi'
import {FaUsers} from 'react-icons/fa'
import {GiWallet} from 'react-icons/gi'
import {IoMdMail, IoMdSettings} from 'react-icons/io'
import { useNavigate } from 'react-router-dom'


const Sidenav = () => {
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
  return (
    <>
      <div className='side'>
        <div className='logo'>

        </div>
        <div className='down'>
        <div className='cont-side'>
          <Link to="/dashboard" style={linkStyles}><h1 className='fs-5 px-2'><BiSolidDashboard/></h1>  <h1 className='fs-5 fw-semibold'>Dashboard</h1></Link>
        </div>
        <div className='cont-side'>
          <Link to="group" style={linkStyles}>
            <h1 className='fs-5 px-2'><FaUsers/></h1>
             <h1 className='fs-5 fw-semibold text-start'>Groups</h1>
          </Link>
        </div>
        <div className='cont-side'>
          <Link to="wallet" style={linkStyles}> <h1 className='fs-5 px-2'><GiWallet/></h1>  <h1 className='fs-5 fw-semibold text-start'>Fund Wallet</h1></Link>
        </div>
        <div className='cont-side'>
          <Link to="" style={linkStyles}> <h1 className='fs-5 px-2'><IoMdMail/></h1>  <h1 className='fs-5 fw-semibold text-start'>Messages</h1></Link>
        </div>
        <div className='cont-side'>
          <Link to="" style={linkStyles}><h1 className='fs-5 px-2'><BiHistory/></h1> <h1 className='fs-5 fw-semibold text-start'>Track payments</h1></Link>
        </div>
        <div className='cont-side'>
          <Link to="" style={linkStyles}> <h1 className='fs-5 px-2'><IoMdSettings/></h1>  <h1 className='fs-5 fw-semibold text-start'>Settings</h1></Link>
        </div>
        <div className='cont-side'>
          <Link to="" onClick={handleLogout} style={linkStyles}><h1 className='fs-5 px-2'><BiLogOut/></h1> <h1 className='fs-5 fw-semibold text-start'>Logout</h1></Link>
        </div>
        </div>
      </div>
    </>
  )
}

export default Sidenav