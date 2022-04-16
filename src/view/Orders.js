import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Select,
    Center,
    Grid,
    Table,
    TableContainer,
    Tr,
    IconButton,
    Td,
    Th,
    Thead, Tbody,
    TableCaption,
    Tfoot,

    GridItem,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Button,
    Heading,
    Tooltip,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import axios from 'axios';
import {Link, Navigate, useNavigate} from  'react-router-dom';
import { useToast } from '@chakra-ui/react'
import React, {useState, useEffect } from 'react';
import DashboardLayout from '../layout/HomeLayout'
const url = "http://localhost:4000"

export default function SimpleCard() {
    // const user_id=JSON.parse(localStorage.getItem('profile')).id;

    // console.log(user_id);
    const navigate=useNavigate()
    const toast=useToast();
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        axios.get(`${url}/api/v1/products`)
          .then((res)=>{
            console.log(res);
            setProducts(res.data.products);
          })
          .catch((err)=>{
            toast({
                title: 'Server side error.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })

          })
    },[])

    const handleDelete=((item)=>{
        console.log(JSON.parse(localStorage.getItem('profile')).token)
        axios.put(`${url}/api/v1/seller/product/${item._id}`,item,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
          .then((res)=>{
            toast({
                title: 'Product Deleted',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setProducts(products.filter((product)=>{
                if(product._id!==item._id){
                    return product
                }
            }))     
          })
          .catch((err)=>{
            toast({
                title: 'Server side error.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
          })
    })

    return (
        <React.Fragment>
            <DashboardLayout>
            <Center  h='auto' bg='white'>
                <Box
                    w={"75%"}
                    >
                <Box m={4}>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"}>Orders</Text>
                    </Box>
                    <TableContainer mb={5}>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Order id </Th>
                                    <Th> Order staus </Th>
                                    <Th>payment status </Th>
                                    <Th> No of products</Th>
                                    <Th>total  </Th>
                                    
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    products.map(item => (
                                        <Tr key={item._id}  >
                                            <Td>{item.image}</Td>
                                            <Td> {item.name }</Td>
                                            <Td>{item.quntity}</Td>
                                            <Td isNumeric>{item.price}</Td>
                             
                                        </Tr>


                                    ))
                                }

                            </Tbody>

                        </Table>
                    </TableContainer>
                </Box>
                </Box>
                </Center>

            </DashboardLayout>
        </React.Fragment>
    );
}