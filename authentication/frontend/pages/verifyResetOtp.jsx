import React, { useState ,useEffect,useContext} from "react";
import  {useRef} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../src/context/AppContext.jsx";
import {useNavigate} from 'react-router-dom';

import "../src/css/verifyResetOtp.css"



const VerifyOtp = () => {
  const [state, setState] = useState("otp")

  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmedPassword, setConfirmedPassword] = useState("")
  const [otp, setOtp]  = useState("");


  const inputRefs = React.useRef([]);
  const location = useLocation();
  const {backendUrl} = useContext(AppContent)
  const navigate = useNavigate();
  



  
  

  useEffect(()=>{
    const urlEmail = location.state?.email || "";
    
    console.log(urlEmail)
    setEmail(urlEmail)
  },[])
  

  const handleInput = (e, index)=>{
    if (e.target.value.length >0 && index< inputRefs.current.length -1){
      inputRefs.current[index+1].focus()
    }
  }

  const handleKeyDown = (e, index)=>{
    if (e.key === 'Backspace' && e.target.value === ""&& index >0){
      inputRefs.current[index-1].focus()
    }
  }

  const validateOtpHandler = async(e)=>{
    e.preventDefault();
    const otpArray = inputRefs.current.map(e=> e.value)
    console.log('the otp array we go is:',otpArray)
    setOtp(otpArray.join(""))
    setState("newPassword")
  }

  const validateNewPasswordHandler = async(e)=>{
    try{

      e.preventDefault();
      console.log("The new password that got typed is ", newPassword)
      if (newPassword !== confirmedPassword){
        alert("The password doesn't match.")
      }
      const {data} = await axios.post(backendUrl + "/api/auth/verifyNewPassword", {email, newPassword, otp})

      if (data.success){
        navigate('/login')
        alert("The password is now changed.")
      }


    }catch(error){
      alert(data.message);
    }
  }

  return (
    <div className="verifyPasswordContainer">
      
      {/* for verifying OTP */}
      
      {state === "otp" && (
      <form className="verifyOtp" onSubmit={validateOtpHandler} >
      <h2> Verify Otp</h2>
      <div className="subVerifyOtp">
        {Array(6).fill(0).map((_, index) => (
            <input
              ref={(e) => (inputRefs.current[index] = e)}
              type="text"
              maxLength="1"
              key={index}
              required
              onInput={(e) => handleInput(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otpInputs"
              // onChange = {(e)=>setOtp(e.target.value)}
              // value = {otp[index]}
            />
  ))}
      </div>

      <button className="verifyButton" type = "submit" >
        Verify
      </button>
      </form>
    )}
    
      
      {/* for email and new password  */}

    {state === "newPassword" && (
      <form onSubmit = {validateNewPasswordHandler} className="verifyOtp" >
      <h2> Reset Password</h2>
      <div className="subvVerifyOtp">
        <input className = "userNewPassword" type = "password" placeholder=" New password" 
          onChange = {(e)=>setNewPassword(e.target.value)} value={newPassword}
        />
        <input className = "userNewPassword" type = "password" placeholder="Confirm new password" 
          onChange = {(e)=>setConfirmedPassword(e.target.value)} value={confirmedPassword}
        />
      </div>

      <button className="verifyButton" type = "submit" >
        Verify
      </button>
      </form>
    )}
</div>
  )
}

export default VerifyOtp;