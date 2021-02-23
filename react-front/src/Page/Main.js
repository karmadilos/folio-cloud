import React from 'react';
import './Main.css'
import { NavLink } from 'react-router-dom'

export function Main(){
    return<>
        <div className="Main">
            <p>Email address</p>
            <input placeholder="Enter Email"/>
            <p>Password</p>
            <input placeholder="Password"/>
            <div className="button">
                <button className="login">로그인</button>
                <NavLink exact to="/Sign-up/"><button className="signup">회원가입</button></NavLink>
            </div>
        </div>
    </>
}
