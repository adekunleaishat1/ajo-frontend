import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {  PostingthriftFailed,  PostingthriftSuccessful,  PostingThrift} from '../Redux/AllthriftSlice'
import axios from "axios";

const CreateThrift = () => {
  const {isposting, postingsuccess, postingerror} = useSelector((state)=> state.AlluserSlice);
  const [posting, setposting]  = useState(false)
  const [contributionname, setcontributionname] = useState("");
  const [plan, setplan] = useState("");
  const [amount, setamount] = useState("");
  const [interest, setinterest] = useState("");
  const [nopeople, setnopeople] = useState("");
  const [image, setimage] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  

  const pickfile = (e) =>{
   const file = e.target.files[0]
  const  reader = new FileReader()
    reader.readAsDataURL(file)
   reader.onload = () => {
       const result = reader.result
       setimage(result)
   }
  }

  const create = () =>{
    setposting(true)
   
   let value = {
    amount:Number(amount),
    contributionname:contributionname,
    interest:Number(interest),
    nopeople:Number(nopeople),
    plan:plan,
    image:image
   }
   let token = localStorage.getItem("token")
   dispatch(PostingThrift())
  axios.post("https://ajo-backend.onrender.com/user/contribution", value, {
    headers:{
      Authorization: `bearer ${token}`
    }
  }).then((res)=>{
    setposting(false)
    dispatch(PostingthriftSuccessful(res.data))
    localStorage.setItem("link",JSON.stringify(res.data))
      toast.success(res.data.message)
       navigate('/dashboard/group')

    setamount("")
    setimage("")
    setcontributionname("")
    setinterest("")
    setnopeople("")
    setplan("")

  }).catch((error)=>{
    setposting(false)
    dispatch(PostingthriftFailed(error.response.data.message))
    let errormessage = error.response.data.message
    toast.error(errormessage)

    setamount("")
    setimage("")
    setcontributionname("")
    setinterest("")
    setnopeople("")
    setplan("")
  })
  }
  return (
    <>
      <div className="con">
        <form className=" form-cont3" action="">
          <div className="log1">
            <h1 className="text-center">Create a Thrift</h1>
          </div>
          <div className="displ">
            <div className="form-group mt-3">
              <label className="label" htmlFor="thriftname">
                Enter thrift name
              </label>
              <input
                className="thrift"
                name="thriftname"
                onChange={(e) => setcontributionname(e.target.value)}
                type="text"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="label" htmlFor="amount">
                Amount to be paid
              </label>
              <input
                className="thrift"
                name="amount"
                onChange={(e) => setamount(e.target.value)}
                type="number"
                required
              />
            </div>
          </div>
          <div className="displ">
            <div className="form-group mt-3">
              <label className="label" htmlFor="interest">
                interest
              </label>
              <input
                className=" thrift"
                name="interest"
                onChange={(e) => setinterest(e.target.value)}
                type="number"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="label" htmlFor="plan">
                plan
              </label>
              <input
                className=" thrift"
                name="plan"
                onChange={(e) => setplan(e.target.value)}
                type="text"
                required
              />
            </div>
          </div>
          <div className="displ">
            <div className="form-group mt-3">
              <label className="label" htmlFor="duration">
                Required Participant
              </label>
              <input
                className=" thrift"
                name="duration"
                onChange={(e) => setnopeople(e.target.value)}
                type="number"
                required
              />
            </div>
            <div className="form-group mt-3">
              <label className="label" htmlFor="image">
                Group Icon
              </label>
              <input
                className=" thrift"
                name="image"
                onChange={(e) => pickfile(e)}
                type="file"
                required
              />
            </div>
          </div>

          <div className="but mt-4">
            <button type="button" onClick={create} className="mx-auto w-50 p-2">{posting? "loading..." : "create"}</button>
          </div>
          <ToastContainer/>
          {/* <p className="text-center mt-2 dont">
            Don't have an account?{" "}
            <Link className="lik" to="/signup">
              Sign Up
            </Link>{" "}
          </p> */}
        </form>
      </div>
    </>
  );
};

export default CreateThrift;
