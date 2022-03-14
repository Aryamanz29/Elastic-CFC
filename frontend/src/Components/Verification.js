import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Styles/Auth.css';
import './Styles/w3.css';

export default function Verification(props) {
    const navigate = useNavigate();
    const [code,setCode] = useState(props.code);
    const [enteredCode,setEnteredCode] = useState("");
    const [message,setMessage] = useState("");
    // methods 
    const handleVerifyCode = (e) =>{setEnteredCode(e.target.value)};
    const handleVerified = () => {
        if (code===enteredCode){
            fetch('http://localhost:8000/api/verified/')
                .then((response) => {
                    if (response.ok){
                        navigate('/logs');
                    }
                    else {
                        setMessage("Something went wrong !");
                    }
                })
        }
        else {
            setMessage("The CODE didn't match !");
        }
    }
    return (
    <div>
        <div className=" w3-center auth-div" >
            { message ? <p className="w3-text-red" >{message}</p> : null }
            <h3>Check your mail we have send you a verification code</h3>
            <p>Enter the 6 digit CODE </p>
            <input type="text" onChange={handleVerifyCode} />
            <button onClick={handleVerified} className="w3-button w3-blue" >Submit</button>
        </div>
    </div>);
}
Verification.defaultProps = {
    code : '000000'
}