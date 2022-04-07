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
import { useToast } from '@chakra-ui/react'
const url="http://localhost:4000"


 
  
  export default function SimpleCard() {
    const [email,setEmail]=useState();
    const toast=useToast()
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
            toast({
              title: 'Email Sent!',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
        })
        .catch((err)=>{
            console.log(err)
            toast({
              title: 'Invalid Email address',
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
        })
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
            <Heading fontSize={'4xl'}>Enter email and check mail</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to reset the password 
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'white')}
            boxShadow={'lg'}
            p={8}>
              
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleChange} name="email" type="email" />
              </FormControl>
              <Stack spacing={10}>
                <Button onClick={handleClick}
                variant={"solid"}
                  >
                  Submit
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