import React, { useEffect, useState } from "react";
import props from "prop-types";
import { Link , useNavigate } from "react-router-dom";
import '../Styles/w3.css';

export default function Auth() {
    const navigate = useNavigate();
    const [isLogin,setIsLogin] = useState(true);
    const isAuthenticated = () => {
        fetch('/api/is-auth')
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
    const showSignUp = () => {setIsLogin(false)};
    const showLogin = () => {setIsLogin(true)};
    const login = () =>{
        return (
        <div>
            <h3>Login here !</h3>
            <input />
            <input />
            <button></button>
        </div>
        );
    }
    const signup = () =>{
        return (
        <div>
            <h3>Sign Up here !</h3>
            <input />
            <input />
            <input />
            <input />
            <button></button>
        </div>
        );
    }

    return (
    <div className="w3-sans-serif w3-center ">
        <h3>This is Authentication Page</h3>
        <button onClick={showSignUp} className="w3-button w3-hover-blue w3-hover-text-white w3-text-grey" ><h5>Sign Up</h5></button>
        <button onClick={showLogin} className="w3-button w3-hover-blue w3-hover-text-white w3-text-blue" ><h5>Login</h5></button>
        <div className="w3-border w3-margin w3-round-large w3-padding w3-border-blue" >
            { isLogin ? login() : signup() }
        </div>
    </div>
    );
}