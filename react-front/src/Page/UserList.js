import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router';
import { ProfileCard } from '../component/User_detail/Profile/ProfileCard';
import { Card } from 'react-bootstrap';
import * as api from "../Api/Api";
export function UserList(){
    const category='users/list'
    const history = useHistory();
    const [users,setUsers]= useState([]);
    useEffect(() => {
        if(localStorage.getItem('token')){
            const server = async () => {
                setUsers(await api.readUser(category));
            }
            server();
        }
        else{
            alert("로그인을 해주세요!");
            history.replace('/login');
        }
    },[]);
    return<>
        hi
        {users && users.map((user,index)=><Card key={index}><ProfileCard user={user}/></Card>)}
</>
}
