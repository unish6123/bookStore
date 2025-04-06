import { useState , useContext} from "react"
import "../src/css/login.css"
import {useNavigate} from 'react-router-dom';
import { AppContent } from "../src/context/AppContext.jsx";
import axios from "axios"




const LogIn = () => {
    const [state, setState]= useState("signUp")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const navigate = useNavigate();
    const {backendUrl , setIsLoggedin} = useContext(AppContent)
    
    const signUpHandler =async(e)=>{
            try{
                
                e.preventDefault();
                // this will help to store in the cookie
                axios.defaults.withCredentials = true

                if (state ==="signUp"){
                   const {data} = await axios.post(backendUrl + '/api/auth/signUp', {name, email, password})
                   
                   if (data.success){
                    setIsLoggedin(true)
                    navigate('/')
                   }else{
                    alert(data.message)
                   }
                }else{
                    const {data} = await axios.post(backendUrl + '/api/auth/signIn', { email, password})
                    console.log(email, password)
                    
                    if (data.success){
                        setIsLoggedin(true)
                        navigate('/')

                    }else{
                        alert(data.message)
                    }
                    
                }
            }catch(error){
                alert(error.message)
            }
    }

  return (
    <div className="loginContainer">
    <div className="subContainer">

        <div className="insideContainer">

        { state === "signUp" ? <h2> Register here</h2>: <h2> Sign in</h2>}
        { state === "signUp" ?<form onSubmit = {signUpHandler}className="inputForm">
            <input onChange= {(e)=>setName(e.target.value)} type = "text" placeholder="Full Name"></input>
            <input onChange= {(e)=>setEmail(e.target.value)} type = "text" placeholder="Email"></input>
            <input onChange= {(e)=>setPassword(e.target.value)} type = "password" placeholder="Password"></input>
        </form> :
        <form onSubmit = {signUpHandler} className="inputForm">
            <input onChange= {(e)=>setEmail(e.target.value)} type = "text" placeholder="Email"></input>
            <input onChange= {(e)=>setPassword(e.target.value)} type = "password" placeholder="Password"></input>
        </form>}
        {state === "signIn" && <p className ="forgotPassword" onClick = {()=>navigate('/passwordReset')}> forgot Password</p>}
        {state === "signUp" ? <button onClick={signUpHandler} type = 'submit' className="signUpButton">Register</button> : <button  type = 'submit' onClick={signUpHandler} className="signinButton"> Sign In</button>}

        
        <p className="or"> ----------or------------</p>
        {state === "signUp" ? <p onClick = {()=>setState('signIn')} className="signinLink">Sign In</p>: <p onClick = {()=> setState("signUp")} className="signinLink">Sign Up</p>}
        
        </div>
        
        
    </div>
    </div>
  )
}

export default LogIn