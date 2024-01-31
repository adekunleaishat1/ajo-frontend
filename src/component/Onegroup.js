import React, { useEffect, useState , useRef} from "react";
import { useParams , Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOnethrift } from "../services/Allthrift";
import { FaFacebook, FaShare, FaTwitter ,FaCopy} from "react-icons/fa";
import {RiWhatsappFill } from "react-icons/ri"

const Onegroup = () => {
  const linkRef = useRef(null);
  const route = useParams();
  const id = route.id;
  console.log(id);

  const { isfetching, onethrift, fetchingerror,} = useSelector((state) => state.AllthriftSlice);
  const linkToShare = "http://localhost:3000/dashboard/group/onegroup/64ee069afe11bbc2a577447f"
  const url = `https://ajo-frontend-teal.vercel.app/join/${id}`
  const message = `Check out this amazing website: ${url}`;
  const dispatch = useDispatch();
  // const get = JSON.parse(localStorage.getItem("link"));
  // console.log(get.contributionLink);
  useEffect(() => {
    getOnethrift(dispatch, id);


  }, [dispatch, id])
  useEffect(() => {
    if (onethrift) {
      console.log(onethrift.members);
      
    }
  }, [onethrift]);
      
  const copytoclipboard  = () =>{
    const text = linkRef.current.innerText;
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
 
  const handleFacebookShare = () => {
    const facebookUrl = 'https://web.facebook.com'
    window.open(facebookUrl, '_blank');
  };

  return (
    <>
      <div className="group-cont">
        <table className="table">
          <tr>
            <th>Members</th>
            <th>Payment details</th>
            <th>S/N</th>
          </tr>
          {(onethrift && onethrift.members.length > 0)  && (
              onethrift.members.map((el, i) => (
                <>
                  <tr key={i}>
                    <td>{el.username }</td>
                    <td>{el.amount}</td>
                    <td>{i + 1}</td>
                  </tr>
                </>
              ))
          )}
        </table>
        <div className="cont-link">
          <table className="link">
            <tr>
              <th>Group Link</th>
              <th>Share</th>
            </tr>
            <tr>
              <td ref={linkRef}>https://ajo-frontend-teal.vercel.app/join/{id}</td>
              <td className="text-center" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><FaShare size="20px"/></td>
            </tr>
          </table>
        </div>
        

<div class="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Share to</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className="row">
           <div onClick={handleFacebookShare} className="col">
            <FaFacebook size="40px"/>
           </div>
           <div className="col">
            <FaTwitter  size="40px"/>
           </div>
           <div className="col">
            <Link to={`https://wa.me/?text=${message}`}><RiWhatsappFill  size="40px"/></Link>
           </div>
           <div onClick={copytoclipboard} className="col">
           <FaCopy size="40px"/>
           </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      </div>
    </>
  );
};

export default Onegroup;
