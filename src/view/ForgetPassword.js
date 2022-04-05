import axios from 'axios';
import React,{useState} from 'react'

const ForgetPassword = () => {

    const [email,setEmail]=useState();
    const url="http://localhost:4000"
    const handleChange=(e)=>{
        setEmail(e.target.value)
    }
    
    const handleClick=()=>{
        console.log("IN")
        console.log(email)
        axios.post(`${url}/api/v1/password/forgot`,{email:email})
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  return (
    <div>
        <p>DDD</p>
        <input type="email" name="email" onChange={handleChange}></input>
        <button onClick={handleClick} >Click</button>
    </div>
  )
}

export default ForgetPassword