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
import {useNavigate} from 'react-router-dom';
import HomeLayout from '../layout/HomeLayout';
import axios from 'axios'
const url="http://localhost:4000"


  
  export default function SimpleCard() {
    const navigate = useNavigate();
    const [errcheck,setErrcheck]=useState('');
    const [signUpdata,setSignUpdata]=useState({email:'',name:'',password:'',confirmPassword:''});
    
    const handleSubmit=((e)=>{
      if(!signUpdata.name ||  !signUpdata.password || !signUpdata.confirmPassword){
        setErrcheck("Kindly fill in all fields.")
      }
      else if(signUpdata.password!==signUpdata.confirmPassword){
          setErrcheck('Password do not match.')
      }
      else{
          console.log(signUpdata)
          axios.post(`${url}/api/v1/register`,signUpdata)
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
            setErrcheck("user already exists");
          })
      }
    })

    const handleChange=(e)=>{
      setSignUpdata({...signUpdata,[e.target.name]:e.target.value})
    }


    return (
        <React.Fragment>
          <HomeLayout>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('text.100', 'text.100')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign Up to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'white')}
            boxShadow={'lg'}
            p={8}>
              {errcheck && <p severity="error">{errcheck}</p>}
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleChange} name="email" type="email" />
              </FormControl>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input onChange={handleChange} name="name" type="text" />
              </FormControl>
              
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input  onChange={handleChange} name="password" type="password" />
              </FormControl>
              <FormControl id="confirm_password">
                <FormLabel>Confirm Password</FormLabel>
                <Input onChange={handleChange} name="confirmPassword" type="password" />
              </FormControl>
             
              <Stack spacing={10}>
                <Button onClick={handleSubmit}
                variant={"solid"}
                  >
                  Sign Up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      </HomeLayout>
      </React.Fragment>
    );
  }