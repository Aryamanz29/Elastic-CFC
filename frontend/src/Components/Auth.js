import React, { useEffect, useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import Verification from './Verification';
import Navbar from "./Navbar";
import '../Styles/w3.css';
import '../Styles/Auth.css';
import axios from "axios";

export default function Auth() {
    // Default States
    axios.defaults.withCredentials=true;
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
    const [checkClass,setCheckClass] = useState("w3-text-red w3-small");
    // Methods
    const checkPassword = () => {
        if (passwd.length>=6){
            setCheckClass("w3-text-green w3-small ")
            return true;
        }
        setCheckClass("w3-text-red w3-small")
        return false;
    }
    const handleSignup = () => {
        if (passwd!==confpasswd){
            setError("The Passwords didn't match ! Try again .");
        }
        else if (checkPassword()){
            setError("Password didn't match our standards!");
        }
        else {
            const data = {
                    password:passwd,
                    username:username,
                    emailid:emailid
            };
            axios.post('http://localhost:8000/api/create-user/',data,{
                headers:{
                    'Content-Type':'application/json',
                },
            }).then((response) => {
                    if (response.status==200){
                        const data = response.data;
                        setCode(data.code);
                    }
                    else {setError("The username or the email ID is already registered !")}
            })
        }
    };
    const handleLogin = () => {
        const data = {
            username:username,
            password:passwd
        }
        axios.post('http://localhost:8000/api/login/',data,{
            headers:{
                'Content-Type':'application/json',
            },
        }).then((response) => {
            if (response.status==200){
                navigate('/logs');
            }
            else {
                setError(response.data.message);
            }
        })
    }
    const toggle = () => {
        let temp = selected;
        setSelected(nselected);
        setNselected(temp);
    }
    const isAuthenticated = () => {
        axios.get('http://localhost:8000/api/is-auth')
            .then(({data}) => {
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
    const handlePsswd = (e) => {
        checkPassword();
        setPsswd(e.target.value)
    };
    const handleConfpsswd = (e) => {setConfpsswd(e.target.value)};
    const login = () =>{
        return (
        <form className="auth-div w3-half" >
            <h2>Login</h2>
            { error ? <p className="w3-text-red" >{error}</p> : null}
            <br />
            <p className=" w3-text-grey w3-left " >Username or Email ID</p>
            <input type="text" onChange={handleUsername} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <br />
            <p className="w3-text-grey w3-left " >Password</p>
            <input autoComplete="on" type="password" onChange={handlePsswd} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <br />
            <button type="button" onClick={handleLogin} className="w3-button w3-text-white w3-round w3-hover-green but" >LOGIN</button>
        </form>
        );
    }
    const signup = () =>{
        return (
            <form className="auth-div w3-half " >
            <h2>Create an Account</h2>
            { error ? <p className="w3-text-red" >{error}</p> : null}
            <br />
            <p className=" w3-text-grey w3-left " >Username</p>
            <input type="text" onChange={handleUsername} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <p className="w3-text-grey w3-left " >Enter a valid email ID for verification</p>
            <input type="email" onChange={handleEmailid} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <p className="w3-text-grey w3-left " >Password</p>
            <br />
            <p className={checkClass} >The password should be atleast 6 charachters long.</p>
            <input autoComplete="on" type="password" onChange={handlePsswd} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <p className="w3-text-grey w3-left " >Confirm Password</p>
            <input autoComplete="on" type="password" onChange={handleConfpsswd} className="w3-input w3-border-black w3-round-xlarge w3-border " required/>
            <br />
            <button type="button" onClick={handleSignup} className="w3-button w3-text-white w3-round w3-hover-green but" >CREATE</button>
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
        <br></br>
        <br></br>
    </div>
    );
}