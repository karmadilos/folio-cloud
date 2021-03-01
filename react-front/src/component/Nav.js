import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Logout } from '../Api/Api';
import './Nav.css';

export function Nav(){

    return(
        <div className='Nav'>
            <h5>RacerIn</h5>
            <nav>
                <ul>
                    <li><NavLink exact to="/login">메인</NavLink></li>
                    <li><NavLink to="/user/">네트워크</NavLink></li>
                    <li><NavLink to="/login" onClick={Logout}>Logout</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}