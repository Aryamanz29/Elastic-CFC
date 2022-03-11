import React, { useEffect, useState } from "react";
import props from "prop-types";
import { Link , useNavigate } from "react-router-dom";
import Verification from './Verification';
import '../Styles/w3.css';
import '../Styles/Auth.css';

export default function Auth() {
    // Default States
    const navigate = useNavigate();
    const [username,setUsername] = useState("");
    const [passwd,setPsswd] = useState("");
    const [confpasswd,setConfpsswd] = useState("");
    const [emailid,setEmailid] = useState("");
    const [selected,setSelected] = useState(" w3-button w3-hover-black w3-text-blue")
    const [nselected,setNselected] = useState(" w3-button w3-hover-black w3-text-grey")
    const [isLogin,setIsLogin] = useState(true);
    const [error,setError] = useState("");
    const [code,setCode] = useState("");
    // Methods
    const handleSignup = () => {
        if (passwd!==confpasswd){
            setError("The Passwords didn't match ! Try again .");
        }
        else {
            const requestOptions = {
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    pswd_hash:passwd,
                    username:username,
                    emailid:emailid
                })
            }
            fetch('http://localhost:8000/api/create-user/',requestOptions)
                .then((response) => response.json())
                .then((data) => setCode(data.code));
        }
    };
    const toggle = () => {
        let temp = selected;
        setSelected(nselected);
        setNselected(temp);
    }
    const isAuthenticated = () => {
        fetch('http://localhost:8000/api/is-auth')
            .then((response) => response.json())
            .then((data) => {
                if (data.isauth){
                    navigate('/logs');
                }
                console.log("not authenticated")
            });
    };
    useEffect(() => {
        isAuthenticated();
    },[])
    const showSignUp = () => {setIsLogin(false);toggle()};
    const showLogin = () => {setIsLogin(true);toggle()};
    const handleUsername = (e) => {setUsername(e.target.value)};
    const handleEmailid = (e) => {setEmailid(e.target.value)};
    const handlePsswd = (e) => {setPsswd(e.target.value)};
    const handleConfpsswd = (e) => {setConfpsswd(e.target.value)};
    const login = () =>{
        return (
        <form className="auth-div w3-half" >
            <h2>Login</h2>
            <br />
            <p className=" w3-text-grey w3-left " >Username</p>
            <input type="text" onChange={handleUsername} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <br />
            <p className="w3-text-grey w3-left " >Password</p>
            <input autoComplete="on" type="password" onChange={handlePsswd} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <br />
            <button type="button" className="w3-button w3-round w3-hover-green w3-blue" >LOGIN</button>
        </form>
        );
    }
    const signup = () =>{
        return (
            <form className="auth-div" >
            <h2>Create an Account</h2>
            { error ? <p className="w3-text-red" >{error}</p> : null}
            <br />
            <p className=" w3-text-grey w3-left " >Username</p>
            <input type="text" onChange={handleUsername} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <p className="w3-text-grey w3-left " >Enter a valid email ID for verification</p>
            <input type="email" onChange={handleEmailid} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <br />
            <p className="w3-text-grey w3-left " >Password</p>
            <input autoComplete="on" type="password" onChange={handlePsswd} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <p className="w3-text-grey w3-left " >Confirm Password</p>
            <input autoComplete="on" type="password" onChange={handleConfpsswd} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <br />
            <button type="button" onClick={handleSignup} className="w3-button w3-round w3-hover-green w3-blue" >CREATE</button>
        </form>
        );
    }

    if (code){
        return <Verification code={code} />;
    }
    return (
    <div className="w3-sans-serif">
        <div>
        <button onClick={showSignUp} className={nselected} ><h5>Sign Up</h5></button>
        <button onClick={showLogin} className={selected} ><h5>Login</h5></button>
        </div>
        <div className="w3-center w3-margin" >
            { isLogin ? login() : signup() }
        </div>
    </div>
    );
}