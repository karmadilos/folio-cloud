import React, {useState, useEffect} from 'react';
import { Login } from './Login'
import { Search } from '../component/Search/Search';
import { useHistory } from 'react-router';
import { UserCard } from '../component/UserDetail/UserCard';
import { Card, Container, Row, Col, CardColumns } from 'react-bootstrap';
import * as api from "../Api/Api";
export function UserList(){
    const category='users/list'
    const current_user = localStorage.getItem("user_id");
    const history = useHistory();
    const [users,setUsers]= useState([]);
    useEffect(() => {
        const server = async () => {
            setUsers(await api.readUser(category));
        }
        server();
    },[]);

    return<>
    <Container className="p-3" fluid>
        { !current_user ? 
            <Row className="justify-content-md-end">
                <Col className="mx-lg-3" xs={3}>
                <Login/>
                </Col>
            </Row>
            :
            <Row className="justify-content-md-center">
                <Col xs={5}>
                    <Search/>
                </Col>
            </Row>
        }
        <Row>
            <Col>
                <CardColumns className="p-3">
                {users && users.map((user,index)=><Card hover style={{boxShadow : "4px 2px 10px rgba(136, 165, 191, 0.48), -4px -2px 10px #FFFFFF"}} className="mb-5"  key={index}><UserCard user={user}/></Card>)}
                </CardColumns>
            </Col>
        </Row>
    </Container>   
</>
}
