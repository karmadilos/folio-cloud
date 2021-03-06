import React from 'react';
import { NavLink, useHistory } from 'react-router-dom'
import { Logout } from '../Api/Api';
import { Nav, Navbar } from 'react-bootstrap';

export function Header(){
    const history = useHistory();
    const current_user = localStorage.getItem("user_id");
    
    return(
        <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">
                <Navbar.Brand>Navbar</Navbar.Brand>
            </Nav>
            <Nav>
                <Nav.Item>
                    <Nav.Link onClick={() => history.push("/")}>Main</Nav.Link>
                </Nav.Item>
                { current_user && 
                    <>
                        <Nav.Item>
                            <Nav.Link onClick={() => history.push(`/user/${current_user}`)}>MyPage</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link onClick={() => {Logout()}}>Logout</Nav.Link>
                        </Nav.Item>
                    </>
                }
            </Nav>
        </Navbar>    
    )
}