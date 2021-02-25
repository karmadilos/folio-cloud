import React, {useState} from 'react';
import {useHistory} from "react-router";
import * as api from '../Api/Api'
import './Login.css'
import { NavLink } from 'react-router-dom'

const id = window.localStorage.getItem('user_id');
export function Login(){
    const history = useHistory();
    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    const setInputData = (key, data) => {
        setInput({
            ...input,
            [key]: data,
        })
    };

    function login(e){
        e.preventDefault();
        const data = new FormData();
        data.append('email',input.email);
        data.append('password',input.password);
        api.Login(data);
        history.push(`/user/${id}`);
    }

    return<>
        <div className="Login">
            <form onSubmit={login} >
                <p>Email address</p>
                <input name="email" type="text" placeholder="Enter Email" onChange={(e) => setInputData('email',e.target.value)}/>
                <p>Password</p>
                <input name="password" type="password" placeholder="Password" onChange={(e) => setInputData('password',e.target.value)}/>
                <div className="button">
                    <button className="login" type='submit'>로그인</button>
                    <NavLink exact to="/signup/"><button className="signup" >회원가입</button></NavLink>
                </div>
            </form>
        </div>
    </>
}
