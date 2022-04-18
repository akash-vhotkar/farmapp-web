import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Select,
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
    Avatar,

    GridItem,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Button,
    Heading,
    Center,
    Tooltip,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { DeleteIcon, InfoIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';

const url = "http://localhost:4000"

export default function SimpleCard() {

    const toast=useToast()
    const [order,setOrder]=useState({
        _id : '',
                shippingInfo : {
                        address : '',
                        city : "",
                        state : "",
                        country : "",
                        pincode : "",
                        phone : ""
                },orderItems:[],
            paymentInfo: {
                id: "",
                status : ""
            },
            createdAt:'',
            orderStatus:''
        });


    useEffect(()=>{
       
        console.log("IN")
        const id=window.location.pathname.substring(21);
        console.log(id)
        axios.get(`${url}/api/v1/order/${id}`,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
        .then((res)=>{
            console.log(res.data.order._id)
            setOrder(res.data.order)
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

    return (
        <React.Fragment>
            <DashboardLayout>
                <Center h='auto' bg='white'>

                    <Box minH={'100vh'}
                        w={"75%"}>
                        <Box>
                            <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"}>Order Details </Text>
                        </Box>
                        <TableContainer>
                            <Table variant='simple'>
                                
                            <Thead>
                                    <Tr>
                                        <Th>Order id  </Th>
                                        <Td>{order._id!==null?order._id:''}  </Td>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Th>Address </Th>
                                        <Td>{order.shippingInfo.address!==null?order.shippingInfo.address:''} </Td>
                                    </Tr>
                                    <Tr>
                                        <Th>
                                            State city
                                        </Th>
                                        <Td>{order.shippingInfo.city!==null?order.shippingInfo.city:''}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th> No of products</Th>
                                        <Td>{order.orderItems!==null?order.orderItems.length:''}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th> pincode </Th>
                                        <Td>{order.shippingInfo.pincode!==null?order.shippingInfo.pincode:''}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>phone no</Th>
                                        <Td>{order.shippingInfo.phone!==null?order.shippingInfo.phone:''}</Td>
                                    </Tr>
                                    <Tr>
                                         <Th>Payment id </Th>
                                         <Tr>{order.paymentInfo.id!==null?order.paymentInfo.id:''}</Tr>
                                    </Tr>
                                    <Tr>
                                        <Th> Payment  status</Th>
                                        <Th>{order.paymentInfo.status!==null?order.paymentInfo.status:''}</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>Placed at </Th>
                                        <Td>{order.createdAt}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th> Order status </Th>
                                        <Td>{order.orderStatus}</Td>
                                    </Tr>
                                    <Tr>
                                        <Th> Total Amount </Th>
                                        <Td>Rs {order.totalPrice}</Td>
                                    </Tr>

                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Box mt={"10vh"}>
                        <Center> 
                            <Text fontSize={"1rem"} fontWeight={"bold"}> Ordered Products </Text>
                        </Center>
                        <TableContainer>
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Product  Image </Th>
                                        <Th>Product name  </Th>
                                        <Th>Product Price </Th>
                                        <Th> Product Quntity</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                    order.orderItems.map((item)=>
                                    <Tr>
                                        <Td><Avatar name='Oshigaki Kisame' src={item.images} /> </Td>
                                        <Td>{item.name}</Td>
                                        <Td> {item.price}</Td>
                                        <Td> {item.quantity} </Td>
                                    </Tr>
                                )}
                                    

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