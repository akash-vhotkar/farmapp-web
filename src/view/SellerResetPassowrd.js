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
    Center,

    GridItem,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast
} from '@chakra-ui/react';
import React,{useState} from 'react';
import DashboardLayout from '../layout/HomeLayout'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const url="https://ecommerce-project-sumit.herokuapp.com"

export default function SimpleCard() {
    const [errcheck,setErrcheck]=useState(false);
    const navigate=useNavigate();
    const [password,setPassword]=useState();
    const [confirmpassword,setconfirmPassword]=useState();
    const toast=useToast()

    const handleSubmit=()=>{
        if(!password || !confirmpassword){
            toast({
                title: 'kindly fill in all fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }
        else{
        const token=window.location.pathname.substring(16)
        axios.put(`${url}/api/v1/password/reset/${token}`,{password:password,confirmPassword:confirmpassword})
        .then((res)=>{
            console.log(res)
            toast({
                title: 'password changed',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            navigate('/')
        })
        .catch((err)=>{
            console.log(err)
            toast({
                title: 'Server error',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        })
        }
    }
       

    const handleChange=(e)=>{
        setPassword(e.target.value)
    }

    

    return (
        <React.Fragment>
            {/* <DashboardLayout> */}
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"} textAlign={"center"}>Reset Password  </Text>
                    </Box>
                    <p>{errcheck}</p>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel> New Password  </FormLabel>
                            <Input onChange={handleChange} name="password" type="password" />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Confirm New Password  </FormLabel>
                            <Input onChange={(e)=>setconfirmPassword(e.target.value)} name="confirmpassword" type="password" />

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

            {/* </DashboardLayout> */}
        </React.Fragment>
    );
}