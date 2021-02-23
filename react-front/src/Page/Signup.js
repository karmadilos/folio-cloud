import React from 'react';
import './Signup.css'

export function Signup(){
    return<>
    <div className="Signup">
        <p>Email address</p>
        <input placeholder="Enter Email"/>
        <p>Password</p>
        <input placeholder="Password"/>
        <p>Confirm Password</p>
        <input placeholder="Password"/>
        <p>Name</p>
        <input placeholder="Name"/>
        <div className="button">
            <button className="signup">회원가입</button>
        </div>
    </div>
</>
}
