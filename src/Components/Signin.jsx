import React, { useContext, useState } from 'react'
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import SigninImg from '../Images/rb_7883.png'
import '../Css files/Signin.css'
import { useNavigate } from 'react-router-dom';
import { Login } from '../Api';
import  { UserContext } from './UserContext';
function Signin() {
    const Navi = useNavigate();
    const {login} = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const HandlePassword = () => {
        setShowPassword(!showPassword);
    }
    const HandleSignup = ()=>{
        Navi('/Signup')
    }
    const HandleHome = ()=>{
        Navi('/Home')
    }
    const HandleLoginUser = async(e)=>{
        try{
            e.preventDefault();
            const response = await Login(username, password);
            if(response.status === 200){
                alert('Login successful');
                login(response.data.user);
                Navi("/Home");
            }
        }
        catch(error){
            console.error("Login error:", error);
            alert('Invalid username or password');
        }
    }
  return (
    <div className="SigninMainDiv">
        <div className="signincenterDiv">

        <div className="SigninSD">
            <FaArrowLeft onClick={HandleHome}/>
            <h1>Welcome Back!!</h1>
            <p>Don't have an account? <a href="" onClick={HandleSignup}>Signup</a></p>
            <form action="" onSubmit={HandleLoginUser} className='SigninForm'>
                <input type="text" name="" id="" placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}} />
                <div className="PasswordDiv">
                    <input type={showPassword ? "text":"password"} name="" id="" placeholder='Password' onChange={(e)=>{setPassword(e.target.value)}} />
                    <span onClick={HandlePassword}>{showPassword ? <FaEye/>:<FaEyeSlash/>}</span>
                </div>
                <span>Forgot Password? <a href="">Reset</a></span>
                <button type="submit">Login</button>
            </form>
        </div>
        <div className="SigninSDImage">
            <img src={SigninImg} alt="" />
        </div>
        </div>
    </div>
  )
}

export default Signin