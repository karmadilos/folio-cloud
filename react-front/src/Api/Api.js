import axios from 'axios';
const token = window.localStorage.getItem('token');
// const id = window.localStorage.getItem('user_id');
const url = 'http://localhost:5000/'

export async function Signup(data) {
    await axios.post(url+'signup',data)
    .then((response) => {
        console.log(JSON.stringify(response));
    })
}

export function Login(data,history){
    axios.post(url+'login',data)
    .then((response) => {
        if(response.data.access_token){
            localStorage.setItem("token",response.data.access_token);
            localStorage.setItem("user_id",response.data.user_id);
            history.push(`/user/upload`);
        }
    })
}

export function Logout(){
    axios.get(url+'logout')
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
}

export async function readEducation(){
    await axios.get(url+'education',{
        headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
        return res.json();
    })
    .catch((e)=>{
        console.log(e);
    })
}

export async function addEducation(data){
    await axios.post(url+'education',data,{
        headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
        console.log(JSON.stringify(res));
    })
    .catch((e)=>{
        console.log(e);
    })
}

export function Upload(data){
    axios.post(url+'user/upload',data,{
        headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
        console.log(JSON.stringify(res));
    })
    .catch((e)=>{
        console.log(e);
    })
}