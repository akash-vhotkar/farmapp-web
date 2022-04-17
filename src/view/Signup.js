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
    toast,
    useToast,
  } from '@chakra-ui/react';
import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import HomeLayout from '../layout/HomeLayout';
import axios from 'axios'
const url="http://localhost:4000"


  
  export default function SimpleCard() {
    const toast=useToast()
    const navigate = useNavigate();
    const [errcheck,setErrcheck]=useState('');
    const [signUpdata,setSignUpdata]=useState({email:'',name:'',password:'',confirmPassword:'',avatar:''});
    
    const handleSubmit=((e)=>{
      if(!signUpdata.name ||  !signUpdata.password || !signUpdata.confirmPassword){
        toast({
          title: 'Kindly fill in all fields.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      else if(signUpdata.password!==signUpdata.confirmPassword){
        toast({
          title: 'Passwords do not match.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      else{
        console.log(signUpdata)
          axios.post(`${url}/api/v1/register`,signUpdata)
          .then((res)=>{
            console.log(res);
            localStorage.setItem('profile',JSON.stringify({token:res?.data.token,id:res.data.user._id}))
            if(res.data.user.role==="user"){
              navigate('/')
            }
            else{
              navigate('/seller-products')
            }
          })
          .catch((err)=>{
            console.log(err)
            toast({
              title: 'User already exists.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          })
      }
    })

    const handleChange=(e)=>{
      setSignUpdata({...signUpdata,[e.target.name]:e.target.value})
    }

    const encode=(e)=>{
      const file=e.target.files[0];
      console.log(file)
      if(typeof file==='undefined'){
          console.log("N")
      }
      else if(100<file.size/1024){
          toast({
              title: 'File size cannot exceed 100kb',
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
      }
      else{
          var fileReader = new FileReader();
          fileReader.onload = function(fileLoadedEvent) {
              const srcData = fileLoadedEvent.target.result;
              setSignUpdata({...signUpdata,[e.target.name]:srcData})
            
          }
          fileReader.readAsDataURL(file);
      } 
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
              <FormControl id="img">
                            <FormLabel>Add Image</FormLabel>
                            <input onChange={(e)=>encode(e)} name="avatar" type="file" /> 
                            
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