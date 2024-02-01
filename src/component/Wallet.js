import React,{useEffect, useState} from 'react'
import {BiDollarCircle } from "react-icons/bi";
import { verifypaymemt } from '../services/Alluser';
import { useDispatch, useSelector } from 'react-redux';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';
import {
  postingUser,
  postingSuccessful,
  postingFailed,
} from '../Redux/AlluserSlice'

const Wallet = () => {
  const publicKey = "pk_test_a937907ad423ac18d530d435f6861d460d4ad42c"
  const {isfetching, alluser, fetchingerror} = useSelector((state) => state.AlluserSlice)
  const dispatch = useDispatch()
  const [userdetails, setuserdetails] = useState(null)
  const [showFundCont, setShowFundCont] = useState(true);
  const [amount, setamount] = useState("");
  const [email, setemail] = useState("");
  const [name, setname] = useState("")
  const [Buttonstyles, setButtonstyles] = useState({
     color: 'white',
  backgroundColor: 'transparent',}); 
  const [backColor, setBackColor] = useState({
    color: 'gray',
    backgroundColor: 'white'
  }); 
  const withdraw = () => {
    setShowFundCont(false);
    setButtonstyles({
      ...Buttonstyles,
      color: 'gray',
      backgroundColor: 'white'
    });
    setBackColor({
      ...backColor,
      color: 'white',
      backgroundColor: 'transparent'
    });
  }
  const contribute = () =>{
    setShowFundCont(true);
    setButtonstyles({
      ...Buttonstyles,
      color: 'white',
      backgroundColor: 'transparent'
    });
    setBackColor({
      ...backColor,
      color: 'gray',
      backgroundColor: 'white'
    });
  }
  
   useEffect(() => {
    console.log(alluser);
    setemail(alluser.email)
    setname(alluser.username)
   }, [])
   
   const payStackSuccess = (reference) => {
    //  alert(JSON.stringify(reference))
    console.log(reference.reference);
     const data = {
      reference: reference.reference,
      amount: amount, 
     };
     const token = localStorage.getItem("token");
     try {
      axios.post("https://ajo-backend.onrender.com/user/pay", data,{
          headers: {
              Authorization: `Bearer ${token}` 
          }
      }).then((res) => {
        dispatch(postingSuccessful("Payment verification successful"));
        console.log(res.data);
        alert("Payment Verification Successful");
      }).catch((err) => {
        dispatch(postingFailed(err.message));
        console.log(err.message);
      });
    } catch (error) {
      console.log(error);
    }
  
   }
 
    const componentProps = {
      email,
      amount: amount,
      name,
      publicKey,
      text: "Fund Wallet",
      onSuccess: (reference) => payStackSuccess(reference),
      onClose: () => alert("oops , Payment not completed :("),
    }
  
  return (
    <>
       <div className='wallet'>
         <div className='d-flex justify-content-between align-items-center mx-auto mt-3 payment'> 
          <div onClick={contribute} style={{ ...backColor}} className='d-flex justify-content-center align-items-center deposit'>
            CONTRIBUTE
          </div>
          <div onClick={withdraw} style={{...Buttonstyles}} className='d-flex justify-content-center align-items-center withdraw'>
            WITHDRAW
          </div>
         </div>

         {showFundCont?(
            <div className='mt-5 fund-cont'>
            <div className='inp-cont'>
             <input onChange={((e)=>setamount(e.target.value * 100))} className='form-control' name='name' type="number" placeholder='Amount' />
            </div>
            {/* <button onClick={ payWithPaystack} className='btn btn-secondary mx-auto'> */}
             <PaystackButton className='paystack' style={{backgroundColor: "blue"}}
              {...componentProps} />
            {/* </button> */}
           </div>
         ):(
          <div className="money-div mx-auto">
          <div className="d-flex justify-content-between align-items-center m-3 balance">
            <h1>Balance</h1>
            <div className="dollar-icon">
              <BiDollarCircle />
            </div>
          </div>
          <div className="text-center mt-3 p-4">
            <h2 className="fs-3 fw-bold">${alluser.wallet}</h2>
          </div>
          <div>
           <button className='mx-auto withdraw-but'>Withdraw</button>
          </div>
        </div>
         )}
       </div>
    </>
  )
}

export default Wallet