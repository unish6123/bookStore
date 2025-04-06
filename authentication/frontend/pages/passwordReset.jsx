import { useNavigate } from 'react-router-dom';
import '../src/css/passwordReset.css'
import { useState, useContext } from 'react';
import axios from "axios";
import { AppContent } from '../src/context/AppContext.jsx';



const PasswordReset = () => {
    const [email, setEmail] = useState('');
    const {backendUrl} = useContext(AppContent)
    

    const navigate = useNavigate();
    const handleOnClick =async(e)=>{
        e.preventDefault();
        navigate('/login')
    }
    const emailValidation = (email)=>{
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    const handleButtonClick = async(e)=>{
        e.preventDefault();
        // axios.defaults.withCredentials = true
        
        
        const emailLabel = document.querySelector(".email label")
        
        const validEmail  = emailValidation(email)
        const inputDiv = document.querySelector(".inputBox")
        try{
            if (validEmail){

                const {data} = await axios.post(backendUrl + '/api/auth/sendForgotPasswordOtp', {email})

                if(data.success){
                    navigate('/verifyOtp',{ state :{email}})
                    inputDiv.style.borderBottom = "1px solid #272323;"
                
                    emailLabel.style.color = "black";
                }else{
                    alert(data.message)
                }

                
            }else{
                emailLabel.style.color = "red";
                inputDiv.style.borderBottom = "2px solid rgb(208, 97, 97)"
                console.log("Error occured.")
            }
        }catch(error){
            console.log(error.message)
        }
            
        
    }

    const handleEmailValidity = async(e)=>{
        e.preventDefault();
        setEmail(e.target.value)
        

    }

  return (
    <div className="resetContainer">
        <div className="subResetContainer">
        <h2 className = "heading"> Reset Password</h2>
            <div className = "contentContainer">
                
                <div className = "email">
                    <label htmlFor = "email"> Email address</label> <br/>
                    <input onChange = {(e)=>setEmail(e.target.value)} className='inputBox' type = "email" placeholder="email"></input>
                </div>

                <button onClick={handleButtonClick} className = "submitButton" type = "submit"> Send Email </button>
                <div className='pAndSpan'>
                <div className="returnSignin">
                <p > 
                Return to <span className = "signIn" 
                onClick={handleOnClick}> Sign in</span> </p>
                </div>
                
                </div>

            </div>

        </div>
    </div>
  )
}

export default PasswordReset;