import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOnethrift } from "../services/Allthrift";
import { FaFacebook, FaShare, FaTwitter, FaCopy, FaBell } from "react-icons/fa";
import { RiWhatsappFill } from "react-icons/ri";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { BsSend } from "react-icons/bs";
import moment from 'moment'

const Onegroup = ({ socket }) => {
  const linkRef = useRef(null);
  const route = useParams();
  const id = route.id;
  const [chatmessage, setchat] = useState("");
  const [allchat, setallchat] = useState([]);
  const [currentuser, setcurrentuser] = useState("")
  const [showingChat, setshowingChat] = useState(false)

  let token = localStorage.getItem("token");

  const { isfetching, onethrift, fetchingerror } = useSelector(
    (state) => state.AllthriftSlice
  );
  const { alluser } =  useSelector((state) => state.AlluserSlice);
  useEffect(() => {
    if (alluser) {
      setcurrentuser(alluser.username)
      console.log(currentuser);
    }
  }, []);
  const linkToShare =
    "http://localhost:3000/dashboard/group/onegroup/64ee069afe11bbc2a577447f";
  const url = `https://ajo-frontend-teal.vercel.app/join/${id}`;
  const message = `Check out this amazing website: ${url}`;
  const dispatch = useDispatch();
  // const get = JSON.parse(localStorage.getItem("link"));
  // console.log(get.contributionLink);
  useEffect(() => {
    getOnethrift(dispatch, id);
  }, [dispatch, id]);
  useEffect(() => {
    if (onethrift) {
      console.log(onethrift.members);
    }
  }, [onethrift]);

  const copytoclipboard = () => {
    const text = linkRef.current.innerText;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleFacebookShare = () => {
    const facebookUrl = "https://web.facebook.com";
    window.open(facebookUrl, "_blank");
  };

  socket.emit("authenticate", token);
  let groupid = id;
  socket.emit("joingroup", groupid);
  const sendchat = () => {
    console.log(chatmessage);
    const groupid = id;
    console.log(groupid);
    let chat = {
      groupid,
      chatmessage,
    };
    socket.emit("newchat", chat);
  };
  socket.on("historychat", (groupMessages) => {
    // console.log("Historical messages:", groupMessages);
    setallchat(groupMessages);
  });
  socket.on("receivechat", (chat) => {
    console.log(chat);
    setallchat([...allchat, chat]);
  });

  const showmessage =() =>{
    setshowingChat(!showingChat)
  }
  return (
    <>
      <div className="group-cont ">
        <table className="table">
          <tr>
            <th>Members</th>
            <th>Payment details</th>
            <th>S/N</th>
          </tr>
          {onethrift &&
            onethrift.members.length > 0 &&
            onethrift.members.map((el, i) => (
              <>
                <tr key={i}>
                  <td>{el.username}</td>
                  <td>{el.amount}</td>
                  <td>{i + 1}</td>
                </tr>
              </>
            ))}
        </table>
        <div className="cont-link">
          <table className="link">
            <tr>
              <th>Group Link</th>
              <th>Share</th>
            </tr>
            <tr>
              <td ref={linkRef}>
                https://ajo-frontend-teal.vercel.app/join/{id}
              </td>
              <td
                className="text-center"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                <FaShare size="20px" />
              </td>
            </tr>
          </table>
        </div>

        <div
          class="modal fade "
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  Share to
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="row">
                  <div onClick={handleFacebookShare} className="col">
                    <FaFacebook size="40px" />
                  </div>
                  <div className="col">
                    <FaTwitter size="40px" />
                  </div>
                  <div className="col">
                    <a href={`https://wa.me/?text=${message}`} target="_blank">
                      <RiWhatsappFill size="40px" />
                    </a>
                  </div>
                  <div onClick={copytoclipboard} className="col">
                    <FaCopy size="40px" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={showingChat? "messagediv" : "messagediv2"}>
        <div className="d-flex justify-content-between align-items-center px-3 py-3 chatnav">
          <h1 className="fs-6 text-white">Chats</h1>
          <div className="tw-flex tw-justify-between tw-border tw-px-6">
            <div>
              <FaBell />
            </div>
            <div onClick={showmessage} className="tw-pl-3">
                {showingChat ? <SlArrowDown /> : <SlArrowUp/>}
            </div>
          </div>
        </div>
        <div className="px-3 py-3 chatbody">
          <div className="mssgcont">
            {Array.isArray(allchat) &&
              allchat.map((element, index) => {
                const isSender = element.userid.username == currentuser;
                const formattedTime = moment(element.createdAt).format('h:mm a')
                return(
                  <div className="w-full">
                <div className={isSender? "tw-flex-row-reverse tw-flex  tw-items-start   tw-w-full tw-gap-3 tw-mb-[10px] tw-py-2" : "tw-flex tw-items-start  tw-justify-start tw-w-full tw-gap-3 tw-mb-[10px] tw-py-2"} key={index}>
                    <div className="tw-capitalize tw-flex tw-items-center tw-leading-none tw-justify-center  tw-w-[40px] tw-h-[40px]  tw-rounded-full tw-text-black tw-bg-[#eeeef8]">
                      <h1 className="tw-text-[15px]">{element.userid.username?.slice(0,1)}</h1>
                    </div>
                    <h1 className={isSender? "tw-font-bold tw-w-[70%] tw-min-h-[70px] messg tw-text-[12px]  tw-text-white tw-px-[8px] tw-py-3 tw-bg-[#7678ed]" : "tw-font-bold tw-w-[90%] tw-min-h-[70px] messg2 tw-text-[12px]  tw-text-black tw-px-[8px] tw-py-3 tw-bg-[#eeeef8]"}>{element.message}   <p className="mssgtime">{formattedTime}</p></h1>
                </div>
                  </div>
                )
           })}
          </div>
          <div className="tw-flex tw-item-center tw-px-3 tw-py-2 tw-justify-center  inputcont">
            <div className="iner-inputcont tw-px-3 tw-py-2 tw-rounded-md tw-flex tw-item-center tw-justify-center  ">
              <input
                placeholder="Your message"
                onChange={(e) => setchat(e.target.value)}
                className="tw-w-[90%] tw-bg-transparent  tw-outline-none tw-inset-3 tw-rounded-md tw-placeholder-gray-400 tw-px-2"
                type="text"
              />
              <button
                onClick={sendchat}
                className="tw-rounded-md tw-py-2 tw-text-white"
              >
                <BsSend className="tw-text-[#7678ed]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onegroup;
