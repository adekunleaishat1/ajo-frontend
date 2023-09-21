import React, { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const Otp = () => {
  const { isposting, postingsuccess, postingerror } = useSelector(
    (state) => state.AlluserSlice
  );
  const [OTP, setOTP] = useState("");
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const [inputs, setInputs] = useState(["", "", "", "", "", ""]);

  const dispatch = useDispatch();
  const handleInputChange = (index, value) => {
    // Update the input value in state
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
    console.log(inputs);

    // Focus on the next input if there's a value
    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  return (
    <>
      <div className="w-100 d-flex justify-content-center align-items-center content">
        <div className="iner-body">
          <div className="iner-body2">
            <div className="forg-cont">
            <h1 className="text-center">Enter OTP</h1>
            <p className="text-center">
              Enter the 6 digit verification code that was sent to your email to
              change your password
            </p>
            </div>
            <div className="inp-div mt-4">
              {inputRefs.map((ref, index) => (
                <input
                  key={index}
                  ref={ref}
                  className="inp-field"
                  maxLength={1}
                  type="text"
                  value={inputs[index]}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
