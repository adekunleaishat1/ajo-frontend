import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Allnotification from "../Redux/Allnotification";
import { Markallasread } from "../Redux/Allnotification";
import { getnotification, update } from "../services/Allnotify";
import {AiOutlineDoubleRight, AiOutlineDoubleLeft} from 'react-icons/ai'

const Message = ({socket}) => {

 const dispatch = useDispatch()
 const { gettingnotify,allnotify,gettingnotifyerror,} = useSelector((state)=> state.Allnotification)
  const [Notification, setNotification] = useState([])
  const [perpage, setperpage] = useState(5)
  const [currentpage, setcurrentpage] = useState(0)

  const totalpage = Math.ceil(allnotify.length / perpage)
  const start = currentpage * perpage
  const end = start + perpage
  const pages = allnotify.slice(start, end)
 const viewmore = () =>{
  if (currentpage < totalpage - 1) {
    setcurrentpage(currentpage + 1);
  }
 }

 const viewless = () =>{
  if (currentpage > 0) {
    setcurrentpage(currentpage - 1);
  }
 }

 useEffect(() => {
  //  fetchnotify()
   getnotification(dispatch, socket)
  
 }, [])

 useEffect(() => {
  console.log(allnotify);
//  update(dispatch)
  
 }, [])
 

 
  return (
    <>
      <div className="px-2">
        <h1>
          Notification
        </h1>
        <div>
           {
            pages.map((e, i)=>(
              <>
                <div className="w-100 mt-3 px-3  p-2 mx-auto rounded border-bottom">
                  {/* <h1 className="fs-4 fw-bold">{e.receiverEmail}</h1> */}
                  <p className="fs-6 text-secondary">{e.message}</p>
                  <p>{new Intl.DateTimeFormat("en-US").format(new Date(e.createdAt)) }</p>
                </div>
              </>
            ))
           }
                <div className="d-flex justify-content-between align-items-center mt-1">
                <button onClick={viewless} className="btn btn-lignt rounded" disabled={currentpage === 0}><AiOutlineDoubleLeft/></button>
                <button onClick={viewmore} className="btn btn-lignt rounded" disabled={currentpage >= totalpage - 1}><AiOutlineDoubleRight/></button>
                </div>
        </div>
        
      </div>
    </> 

);
};

export default Message;
