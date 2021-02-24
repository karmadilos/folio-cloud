import React, {useState} from 'react';
import {useHistory} from "react-router";
import axios from 'axios';
import './Main.css'
import { NavLink } from 'react-router-dom'

export function Main(){

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

    async function login(e){
        e.preventDefault();
        const data = new FormData();
        data.append('email',input.email);
        data.append('password',input.password);
        setInput({email: '',
        password: ''});
        await axios.post('http://localhost:5000/',data)
        .then((response) => {
            console.log(JSON.stringify(response));
        })
        history.push('/')
    }

    return<>
        <div className="Main">
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
