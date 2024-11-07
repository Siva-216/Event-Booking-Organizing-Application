import React, { useState } from 'react';
import '../Css files/Signup.css';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import SignUpImg from '../Images/rb_7885.png';
import { useNavigate } from 'react-router-dom'; // Import the signup API function
import { createNewAccount} from '../Api';

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        Name: '',
        UserName: '',
        Email: '',
        Password: '',
        Gender: '',
    });
    const [error, setError] = useState(null);

    const HandlePassword = () => {
        setShowPassword(!showPassword);
    };

    const HandleLogin = () => {
        navigate('/Login');
    };

    const HandleHome = () => {
        navigate('/Home');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await createNewAccount(formData);
            console.log(response);
            alert(response.message);
            navigate('/Home'); // Redirect to login after successful signup
        } catch (error) {
            console.error("Signup error:", error);
            setError(error); // Set error to display message
        }
    };

    return (
        <div className="SignupMainDiv">
            <div className="signupcenterDiv">
                <div className="SignUpSD">
                    <FaArrowLeft onClick={HandleHome} />
                    <h1>Create an account</h1>
                    <p>Already have an account? <a href="#" onClick={HandleLogin}>Login</a></p>
                    <form onSubmit={handleSignup} className='SignupForm'>
                        <div className="nameandGenderDiv">
                        <input type="text" name="Name" placeholder='Name' onChange={handleInputChange} />
                            <select name="Gender" onChange={handleInputChange}>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                            <input type="text" name="UserName" placeholder='Username' onChange={handleInputChange} />
                        <input type="email" name="Email" placeholder='Email' onChange={handleInputChange} />
                        <div className="PasswordDiv">
                            <input type={showPassword ? "text" : "password"} name="Password" placeholder='Password' onChange={handleInputChange} />
                            <span onClick={HandlePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                        </div>
                        <button type="submit">Create account</button>
                    </form>
                        {error && <p className="error" style={{color:"red"}}>{error}</p>}
                </div>
                <div className="SignUpSDImage">
                    <img src={SignUpImg} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Signup;
