import React, {useState} from 'react';
import {useHistory} from "react-router";
import './Signup.css'
import * as api from '../Api/Api'


export function Signup(){
    const history = useHistory();
    const [input, setInput] = useState({
        email: '',
        password: '',
        c_password: '',
        name: ''
    });

    const setInputData = (key, data) => {
        setInput({
            ...input,
            [key]: data,
        })
    };

    async function signup(e){
        e.preventDefault();
        const data = new FormData();
        data.append('email',input.email);
        data.append('password',input.password);
        data.append('name',input.name);
        api.Signup(data);
        history.push('/login')
    }

    return<>
    <div className="Signup">
        <form onSubmit={signup}>
            <p>Email address</p>
            <input name="email" type="text" placeholder="Enter Email" onChange={(e) => setInputData('email',e.target.value)}/>
            <p>Password</p>
            <input name="password" type="password" placeholder="Password" onChange={(e) => setInputData('password',e.target.value)}/>
            <p>Confirm Password</p>
            <input type="password" placeholder="Password" onChange={(e) => setInputData('c_password',e.target.value)}/>
            <p>Name</p>
            <input name="name" type="text" placeholder="Name" onChange={(e) => setInputData('name',e.target.value)}/>
            <div className="button">
                <button className="signup" type="submit">회원가입</button>
            </div>
        </form>
    </div>
</>
}
