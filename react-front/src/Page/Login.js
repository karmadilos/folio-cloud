import React, {useState} from 'react';
import {useHistory} from "react-router";
import * as api from '../Api/Api'
import './Login.css'
import { NavLink } from 'react-router-dom'


export function Login(){
    const history = useHistory();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    };


    function login(e){
        e.preventDefault();
        api.Login(inputs,history);
    }

    return<>
        <div className="Login">
            <form onSubmit={login} >
                <p>Email address</p>
                <input name="email" type="text" placeholder="Enter Email" onChange={handleChange}/>
                <p>Password</p>
                <input name="password" type="password" placeholder="Password" onChange={handleChange}/>
                <div className="button">
                    <button className="login" type='submit'>로그인</button>
                    <NavLink exact to="/signup/"><button className="signup" >회원가입</button></NavLink>
                </div>
            </form>
        </div>
    </>
}
