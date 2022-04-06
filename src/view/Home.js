import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
import React,{useState} from 'react';
import HomeLayout from '../layout/HomeLayout';
import Navbar  from  '../layout/HomeLayout';
import {useNavigate} from 'react-router-dom';
  import axios from 'axios'
const url="http://localhost:4000"

  
  export default function SimpleCard() {
    const navigate = useNavigate();
    const [errcheck,setErrcheck]=useState('');
    const [logIndata,setLogIndata]=useState({email:'',password:''});
    
    const handleSubmit=((e)=>{
      if(!logIndata.email ||  !logIndata.password){
        setErrcheck("Kindly fill in all fields.")
      }
      else{
        console.log(logIndata)
        axios.post(`${url}/api/v1/login`,logIndata)
          .then((res)=>{
            console.log(res);
            localStorage.setItem('profile',JSON.stringify({token:res?.data.token,id:res.data.user._id}))
            if(res.data.user.role==="user"){
              navigate('/home')
            }
            else{
              navigate('/')
            }
          })
          .catch((err)=>{
            
            setErrcheck("Username or password incorrect");
          })
      }
    })

    const handleChange=(e)=>{
      setLogIndata({...logIndata,[e.target.name]:e.target.value})
    }

    return (
        <React.Fragment>
          <HomeLayout>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('text.100', 'text.100')}>
            <h1>thise is home page </h1>
      </Flex>
      </HomeLayout>
      </React.Fragment>
    );
  }