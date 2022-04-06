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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const url = "http://localhost:4000"

export default function SimpleCard() {
    const [errcheck, setErrcheck] = useState(false);
    const navigate = useNavigate();
    const [profileData, setprofileData] = useState({ name: '', email: '' });


    const handleUpdate = ((e) => {
        //   if(!profileData.name || !profileData.email){
        //     setErrcheck("Kindly fill in all fields.")
        //   }
        //   else{
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
        //   }
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
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"} textAlign={"center"}>Profile  </Text>
                    </Box>
                    <center style={{display:"flex" , alignItems:"center"}}>
                                <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />{' '}
                        
                    </center>
                    <p>{errcheck}</p>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel> Name </FormLabel>
                            <Input onChange={handleChange} name="name" type="text" />
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email </FormLabel>
                            <Input onChange={handleChange} name="email" type="email" />

                        </FormControl>
                        <Stack spacing={10}>
                            <Button onClick={handleUpdate}
                                variant={"solid"}
                            >
                                Update Profile
                            </Button>
                        </Stack>
                        <Stack spacing={10}>
                            <Link  >
                                <Button style={{ width: "100%" }} onClick={handleReset}
                                    variant={"solid"}
                                >
                                    Reset Password
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Box>

            </DashboardLayout>
        </React.Fragment>
    );
}