import React ,{useEffect, useState}from 'react'
import { BiBookAdd, BiDollarCircle } from "react-icons/bi";
import {CiWavePulse1} from "react-icons/ci"
import { useSelector, useDispatch } from 'react-redux';
import { verifyuser } from '../services/Alluser';

const Dash = () => {
  const {isfetching, alluser, fetchingerror} =  useSelector((state) => state.AlluserSlice);
  const [userdetails, setUserdetails] = useState("");
  const [wallet, setwallet] = useState("")
  const dispatch = useDispatch()

   useEffect(() => {
      verifyuser(dispatch)

   }, [dispatch])
   
  useEffect(() => {
    console.log(alluser);
    setUserdetails(alluser)
    console.log(userdetails);
    setwallet(alluser.wallet)
  }, [alluser]) 

  
  return (
    <> 
       <div>
       <div className="dash-cont">
            <div className="money-div">
              <div className="d-flex justify-content-between align-items-center m-3 balance">
                <h1>Balance</h1>
                <div className="dollar-icon">
                  <BiDollarCircle />
                </div>
              </div>
              <div className="text-center mt-3 p-4">
                <h2 className="fs-3 fw-bold">₦{wallet}</h2>
              </div>
            </div>
            <div className="money-div">
              <div className="d-flex justify-content-between align-items-center m-3 balance">
                <h1>Total Deposit</h1>
                <div className="dollar-icon">
                  <BiBookAdd/>
                </div>
              </div>
              <div className="text-center mt-3 p-4">
                <h2 className="fs-3 fw-bold">₦250.00 </h2>
              </div>
            </div>
            <div className="money-div">
              <div className="d-flex justify-content-between align-items-center m-3 balance">
                <h1>Total Withdrawal</h1>
                <div className="dollar-icon">
                  <CiWavePulse1/>
                </div>
              </div>
              <div className="text-center mt-3 p-4">
                <h2 className="fs-3 fw-bold">₦250.00</h2>
              </div>
            </div>
            <div className="money-div">
              <div className="d-flex justify-content-between align-items-center m-3 balance">
                <h1>Balance</h1>
                <div className="dollar-icon">
                  <BiDollarCircle />
                </div>
              </div>
              <div className="text-center mt-3 p-4">
                <h2 className="fs-3 fw-bold">₦250.00 </h2>
              </div>
            </div>
          </div>
       </div>

    </>
  )
}

export default Dash