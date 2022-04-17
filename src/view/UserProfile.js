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
    Wrap,
    WrapItem,
    Avatar,
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
    Center,
    toast,
} from '@chakra-ui/react';
import React, { useState,useEffect } from 'react';
import DashboardLayout from '../layout/HomeLayout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const url = "http://localhost:4000"

export default function SimpleCard() {
    const [errcheck, setErrcheck] = useState(false);
    const navigate = useNavigate();
    const [profileData, setprofileData] = useState({ name: '', email: '' });
    const [cuser,setCuser]=useState({avatar:"",
  email: "",
  name: "",
  role: "",
  _id:""})

    useEffect(()=>{
        if(localStorage.getItem('profile')!==null){
            axios.get(`${url}/api/v1/me`,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
            }})
            .then((res)=>{
            console.log(res)
            setCuser(res.data.user)
            })
            .catch((err)=>{
            console.log(err)
            })
        }
    },[])

        
    const handleUpdate = ((e) => {
          if(!profileData.name || !profileData.email){
           toast({
            title: 'Kindly fill all fields',
            status: 'error',
            duration: 9000,
            isClosable: true,
           })
          }
          else{
        console.log(profileData)

        axios.put(`${url}/api/v1/me/update`, profileData, {
            headers: {
                cookies: JSON.parse(localStorage.getItem('profile')).token
            }
        })
            .then((res) => {
                console.log(res);
                navigate('/')
            })
            .catch((err) => {
                console.log("ERR")
            })
          }
    })

    const handleReset = (() => {
        console.log("IN")
        navigate('/update-password') // after login
    })

    const handleChange = (e) => {
        setprofileData({ ...profileData, [e.target.name]: e.target.value })
    }



    return (
        <React.Fragment>
            <DashboardLayout>
            <Center  h='auto' bg='white'>
                <Box
                    w={"75%"}
                    >
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"} textAlign={"center"}>Profile  </Text>
                    </Box>
                    <Center >
                                <Avatar size='2xl' name='Segun Adebayo' src={cuser.avatar?.url} />{' '}
                        
                    </Center>
                    <p>{errcheck}</p>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel> Name </FormLabel>
                            <Input value={cuser.name} onChange={handleChange} name="name" type="text" />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email </FormLabel>
                            <Input value={cuser.email} onChange={handleChange} name="email" type="email" />

                        </FormControl>
                        <Stack spacing={10}>
                            <Button onClick={handleUpdate}
                                variant={"solid"}
                            >
                                Update Profile
                            </Button>
                        </Stack>
 
                    </Stack>
                </Box>
</Box>
</Center>
            </DashboardLayout>
        </React.Fragment>
    );
}