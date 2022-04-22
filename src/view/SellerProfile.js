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
    useToast,
} from '@chakra-ui/react';
import React, { useState,useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const url = "https://ecommerce-project-sumit.herokuapp.com"

export default function SimpleCard() {
    const toast=useToast()
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
          if(!cuser.name || !cuser.email){
           toast({
            title: 'Kindly fill all fields',
            status: 'error',
            duration: 9000,
            isClosable: true,
           })
          }
          else{
        console.log(cuser)

        axios.put(`${url}/api/v1/me/update`, cuser, {
            headers: {
                cookies: JSON.parse(localStorage.getItem('profile')).token
            }
        })
            .then((res) => {
                console.log(res);
                toast({
                    title: 'Profile Updated',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                   })
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
        console.log(e.target.value)
        setCuser({ ...cuser, [e.target.name]: e.target.value })
    }



    return (
        <React.Fragment>
            <DashboardLayout>
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"} textAlign={"center"}>Profile  </Text>
                    </Box>
                    <Center style={{display:"flex" , alignItems:"center"}}>
                                <Avatar size='2xl' name='Segun Adebayo' src={cuser.avatar?.url} />{' '}
                        
                    </Center>
                    <p>{errcheck}</p>
                    <Stack spacing={4}>
                    {/* <Input value={cuser.name} onChange={handleChange} name="name" type="text" /> */}
                        <FormControl id="name">
                            <FormLabel> Name </FormLabel>
                            <Input value={cuser.name} name="name" type="text" onChange={handleChange} />
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

            </DashboardLayout>
        </React.Fragment>
    );
}