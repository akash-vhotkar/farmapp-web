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
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'white')}
            boxShadow={'lg'}
            p={8}>
              <p>{errcheck}</p>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleChange} name="email" type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange={handleChange} name="password" type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button onClick={handleSubmit}
                variant={"solid"}
                  >
                  Sign in
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