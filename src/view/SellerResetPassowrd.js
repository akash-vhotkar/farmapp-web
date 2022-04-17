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
} from '@chakra-ui/react';
import React,{useState} from 'react';
import DashboardLayout from '../layout/HomeLayout'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
const url="http://localhost:4000"

export default function SimpleCard() {
    const [errcheck,setErrcheck]=useState(false);
    const navigate=useNavigate();
    const [password,setPassword]=useState();
    const [confirmpassword,setconfirmPassword]=useState();
    
    const handleSubmit=()=>{
        console.log(password,confirmpassword)
        const token=window.location.search.substring(7)
        console.log(token)
        axios.put(`${url}/api/v1/password/reset/${token}`,{password:password,confirmPassword:confirmpassword})
        .then((res)=>{
            console.log(res)
            navigate('/signin')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
       

    const handleChange=(e)=>{
        setPassword(e.target.value)
    }

    

    return (
        <React.Fragment>
            <DashboardLayout>
            <Center  h='auto' bg='white'>
                <Box
                    minH={'100vh'}
                    w={"75%"}


                    >
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
                </Box>
</Center>
            </DashboardLayout>
        </React.Fragment>
    );
}