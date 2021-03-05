import React, {useState} from 'react';
import {useHistory} from "react-router";
import './Signup.css'
import * as api from '../Api/Api'


export function Signup(){
    const history = useHistory();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        c_password: '',
        name: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputs({...inputs, [name]: value})
    };

    async function signup(e){
        e.preventDefault();
        api.Signup(inputs);
        history.push('/')
    }

    return<>
    <div className="Signup">
        <form onSubmit={signup}>
            <p>Email address</p>
            <input name="email"  type="text" placeholder="Enter Email" onChange={handleChange}/>
            <p>Password</p>
            <input name="password"  type="password" placeholder="Password" onChange={handleChange}/>
            <p>Confirm Password</p>
            <input name="c_password" type="password"  placeholder="Password" onChange={handleChange}/>
            <p>Name</p>
            <input name="name"  type="text" placeholder="Name" onChange={handleChange}/>
            <div className="button">
                <button className="signup" type="submit">회원가입</button>
            </div>
        </form>
    </div>
</>
}
