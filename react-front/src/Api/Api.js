import axios from 'axios';
const token = window.localStorage.getItem('token');
// const url = `${window.location.hostname}:5000/` 배포용 url
const url = "http://localhost:5000/"

export async function Signup(data) {
    await axios.post(url+'signup',data)
    .then((response) => {
        console.log(JSON.stringify(response));
    })
}

export function Login(data){
    axios.post(url+'login',data)
    .then((response) => {
        if(response.data.access_token){
            localStorage.setItem("token",response.data.access_token);
            localStorage.setItem("user_id",response.data.user_id);
            window.location.reload();
        }else{
        alert(response.data.error);}
    })
}

export function Logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.reload();
}

export async function readInfo(category,id){
    return await axios.get(url+category+"/"+id,{
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

export async function addInfo(category,data){
    console.log(data);
    await axios.post(url+category,data,{
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
export async function fixInfo(category,data){
    console.log(data);
    await axios.put(url+category+'/'+data.id,data,{
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

export async function deleteInfo(category,data){
    console.log(data);
    await axios.delete(url+category+'/'+data.id,{
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

export async function fixUser(category,data){
    console.log(data);
    await axios.put(url+category+'/'+data.id,data,{
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

export async function readUser(category){
    return await axios.get(url+category,{
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