import React, { useEffect, useState } from "react";
import { BiDollarCircle } from "react-icons/bi";
import { verifypaymemt } from "../services/Alluser";
import { useDispatch, useSelector } from "react-redux";
import { PaystackButton } from "react-paystack";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  postingUser,
  postingSuccessful,
  postingFailed,
} from "../Redux/AlluserSlice";

const Wallet = () => {
  // const publicKey = "pk_test_a937907ad423ac18d530d435f6861d460d4ad42c"
  const isPaymentInitialized = localStorage.getItem("paymentInitialized") === "true";
  const [paymentinitialized, setpaymentinitialized] = useState(false)
  const { isfetching, alluser, fetchingerror } = useSelector(
    (state) => state.AlluserSlice
  );
  const dispatch = useDispatch();
  const [userdetails, setuserdetails] = useState(null);
  const [showFundCont, setShowFundCont] = useState(true);
  const [amount, setamount] = useState("");
  const reference = localStorage.getItem("reference");
  const [Buttonstyles, setButtonstyles] = useState({
    color: "white",
    backgroundColor: "transparent",
  });
  const [backColor, setBackColor] = useState({
    color: "gray",
    backgroundColor: "white",
  });
  const withdraw = () => {
    setShowFundCont(false);
    setButtonstyles({
      ...Buttonstyles,
      color: "gray",
      backgroundColor: "white",
    });
    setBackColor({
      ...backColor,
      color: "white",
      backgroundColor: "transparent",
    });
  };
  const contribute = () => {
    setShowFundCont(true);
    setButtonstyles({
      ...Buttonstyles,
      color: "white",
      backgroundColor: "transparent",
    });
    setBackColor({
      ...backColor,
      color: "gray",
      backgroundColor: "white",
    });
  };
  useEffect(() => {
    if (isPaymentInitialized && reference) {
      payStackSuccess(reference);
    } else {
      console.error("Payment reference not found.");
      // Handle the missing reference case
    }
    // return () => setpaymentinitialized(false);
  }, [ reference]);

  useEffect(() => {
    console.log(alluser);
  }, []);

  const initialize = async () => {
    const email = alluser.email;
    const name = alluser.username;
    const token = localStorage.getItem("token");
    await axios
      .post(
        "https://ajo-backend.onrender.com/user/initialize",
        {
          email,
          name,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.authorization_url);
        localStorage.setItem("reference", res.data.data.reference);
        toast.success(res.data.message);
        // setpaymentinitialized(true)
        localStorage.setItem("paymentInitialized", "true");
        setTimeout(()=>{
          window.location.href = res.data.data.authorization_url;
        },[3000])
      })
      .catch((err) => {
        toast.error(err.response.data?.message);
      });
  };

  const payStackSuccess = (reference) => {
    const token = localStorage.getItem("token");
    try {
      axios.post("https://ajo-backend.onrender.com/user/verifypayment",
          { reference },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch(postingSuccessful(res.data.message));
          toast.success(res.data.message);
        })
        .catch((err) => {
          dispatch(postingFailed(err.response?.data.message));
          toast.error(err.response?.data.message);
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // const componentProps = {
  //   email,
  //   amount: amount,
  //   name,
  //   publicKey,
  //   text: "Fund Wallet",
  //   onSuccess: (reference) => payStackSuccess(reference),
  //   onClose: () => alert("oops , Payment not completed :("),
  // }

  return (
    <>
      <div className="wallet">
        <div className="d-flex justify-content-between align-items-center mx-auto mt-3 payment">
          <div
            onClick={contribute}
            style={{ ...backColor }}
            className="d-flex justify-content-center align-items-center deposit"
          >
            CONTRIBUTE
          </div>
          <div
            onClick={withdraw}
            style={{ ...Buttonstyles }}
            className="d-flex justify-content-center align-items-center withdraw"
          >
            WITHDRAW
          </div>
        </div>

        {showFundCont ? (
          <div className="mt-5 fund-cont">
            {/* <div className="inp-cont"> */}
              <input
                name={setamount}
                onChange={(e) => setamount(e.target.value * 100)}
                className="form-control"
                type="number"
                placeholder="Amount"
              />
            {/* </div> */}
            <button onClick={initialize} className="paystack">
              Fund wallet
            </button>
            <ToastContainer />
            {/* <PaystackButton className='paystack' style={{backgroundColor: "blue"}}
              {...componentProps} /> */}
          </div>
        ) : (
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
              <button className="mx-auto withdraw-but">Withdraw</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wallet;
