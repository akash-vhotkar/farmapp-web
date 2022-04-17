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
    const u="http://localhost:4000/order-detail/"
    const navigate=useNavigate()
    const toast=useToast();
    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        axios.get(`${url}/api/v1/orders/me`,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
          .then((res)=>{
            console.log(res);
            setOrders(res.data.orders);
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
        // console.log(JSON.parse(localStorage.getItem('profile')).token)
        // axios.put(`${url}/api/v1/seller/product/${item._id}`,item,{headers:{
        //     cookies:JSON.parse(localStorage.getItem('profile')).token
        // }})
        //   .then((res)=>{
        //     toast({
        //         title: 'Product Deleted',
        //         status: 'success',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        //     setProducts(products.filter((product)=>{
        //         if(product._id!==item._id){
        //             return product
        //         }
        //     }))     
        //   })
        //   .catch((err)=>{
        //     toast({
        //         title: 'Server side error.',
        //         status: 'error',
        //         duration: 9000,
        //         isClosable: true,
        //     })
        //   })
    })

    const handleClick=(id)=>{
        navigate(`/order-detail/${id}`)
    }

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
                                    <Th>Payment staus </Th>
                                    <Th>Order status </Th>
                                    <Th> No of products</Th>
                                    <Th>Total Amount</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    orders.map(item => (
                                        <Tr key={item._id} >
                                            <Td onClick={()=>handleClick(item._id)}>{item._id}</Td>
                                            <Td>{item.paymentInfo.status}</Td>
                                            <Td> {item.orderStatus }</Td>
                                            <Td>{item.orderItems.length}</Td>
                                            <Td isNumeric>Rs {item.totalPrice}</Td>
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