import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Grid,
  Table,
  TableContainer,
  Tr,
  Td,
  Th,
  Thead, Tbody,
  TableCaption,
  Tfoot,

  GridItem,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React,{useState} from 'react';
import DashboardLayout from '../layout/DashboardLayout'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const url="http://localhost:4000"


const UpdatePassword = () => {
    const toast=useToast()
    const navigate=useNavigate();
    const [passwords,setPasswords]=useState({oldPassword:'',newPassword:'',confirmPassword:''});

    
    const handleSubmit=()=>{
        if(!passwords.oldPassword || !passwords.newPassword || !passwords.confirmPassword){
            toast({
                title: 'Kindly enter all fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else if(passwords.newPassword!==passwords.confirmPassword){
            toast({
                title: 'Password do not match',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else{
            axios.put(`${url}/api/v1/password/update`,{oldPassword:passwords.oldPassword,newPassword:passwords.newPassword,confirmPassword:passwords.confirmPassword}
            ,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
            .then((res)=>{
                navigate('/seller-products')
                toast({
                    title: 'Password Updated',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            })
            .catch((err)=>{  
                toast({
                    title: 'Incorrect Password',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
        }
    }
       

    const handleChange=(e)=>{
        setPasswords({...passwords,[e.target.name]:e.target.value})
    }

    

  return (
    <React.Fragment>
    <DashboardLayout>
        <Box>
            <Box>
                <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"} textAlign={"center"}>Reset Password  </Text>
            </Box>
            <Stack spacing={4}>
            <FormControl id="oldpassword">
                    <FormLabel> Old Password  </FormLabel>
                    <Input onChange={handleChange} name="oldPassword" type="password" />
                </FormControl>
                <FormControl id="newpassword">
                    <FormLabel> New Password  </FormLabel>
                    <Input onChange={handleChange} name="newPassword" type="password" />
                </FormControl>
                <FormControl id="confirmpassword">
                    <FormLabel>Confirm New Password  </FormLabel>
                    <Input onChange={handleChange} name="confirmPassword" type="password" />

                </FormControl>
                <Stack spacing={10}>
                    <Button onClick={handleSubmit}
                        variant={"solid"}
                    >
                    Reset Password 
                    </Button>
                </Stack>
            </Stack>
        </Box>

    </DashboardLayout>
</React.Fragment>
  )
}

export default UpdatePassword