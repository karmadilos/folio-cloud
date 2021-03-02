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
            history.push(`/user`);
            window.location.reload();
        }
    })
}

export function Logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
}

export async function readInfo(d){
    return await axios.get(url+d,{
        headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
        return res.data.result;
    })
    .catch((e)=>{
        console.log(e);
    });
}

export async function addInfo(d,data){
    await axios.post(url+d,data,{
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

export async function deleteInfo(d,data){
    await axios.delete(url+d,{
        headers: {
        Authorization: `Bearer ${token}`
      },data
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