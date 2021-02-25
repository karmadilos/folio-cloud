import axios from 'axios';
const token = window.localStorage.getItem('token');

const url = 'http://localhost:5000/'
export async function Signup(data) {
    await axios.post(url+'signup',data)
    .then((response) => {
        console.log(JSON.stringify(response));
    })
}

export function Login(data){
    const res = axios.post(url+'login',data)
    .then((response) => {
        if(response.data.access_token){
            localStorage.setItem("token",response.data.access_token);
            localStorage.setItem("user_id",response.data.user_id);
        }
    })
}

export function Logout(){
    axios.get(url+'logout')
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
}