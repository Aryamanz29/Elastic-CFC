import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Auth.css';
import '../Styles/w3.css';
import axios from "axios";

export default function Verification(props) {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName="csrftoken";
    axios.defaults.xsrfHeaderName="X-CSRFTOKEN";
    const navigate = useNavigate();
    const [code,setCode] = useState(props.code);
    const [enteredCode,setEnteredCode] = useState("");
    const [message,setMessage] = useState("");
    // methods 
    const handleVerifyCode = (e) =>{setEnteredCode(e.target.value)};
    const handleVerified = () => {
        console.log(code);
        if (code==enteredCode){
            axios.get('http://localhost:8000/api/verified/')
                .then((response) => {
                    if (response.status==200){
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
        <div className=" w3-half w3-center verify-div" >
            { message ? <p className="w3-text-red" >{message}</p> : null }
            <h3 className="w3-center" >Check your email we have send you a verification code</h3>
            <p className="w3-text-grey" >Enter the 6 digit CODE </p>
            <br />
            <input className="w3-input w3-round w3-border " type="text" onChange={handleVerifyCode} />
            <br />
            <button onClick={handleVerified} className=" w3-round w3-button w3-blue" >Submit</button>
        </div>
    </div>);
}
Verification.defaultProps = {
    code : '000000'
}