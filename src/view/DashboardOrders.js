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
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout'
const url = "https://ecommerce-project-sumit.herokuapp.com"

export default function SimpleCard() {

    const navigate = useNavigate()
    const toast = useToast();
    const [date,setDate]=useState('')
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get(`${url}/api/v1/admin/orders`,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
            .then((res) => {
                console.log(res);
                setOrders(res.data.orders);
                console.log("IN")
            })
            .catch((err) => {
                toast({
                    title: 'Server side error.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })

            })
    }, [date])

    const handleDelete = ((id) => {
      
        axios.delete(`${url}/api/v1/admin/deleteorder/${id}`, {
            headers: {
                cookies: JSON.parse(localStorage.getItem('profile')).token
            }
        })
            .then((res) => {
                toast({
                    title: 'Product Deleted',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                setOrders(orders.filter((order) => {
                    if (order._id !== id) {
                        return order
                    }
                }))
            })
            .catch((err) => {
                toast({
                    title: 'Server side error.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    })

    const handleChange=(e,id)=>{



        axios.put(`${url}/api/v1/admin/updateorder/${id}`,{status:e.target.value},{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
        .then((res)=>{
            if(e.target.value==="Delivered"){
                setDate("d")
            }
            toast({
                title: 'Status Changed Success',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
        })
        .catch((err)=>{
            toast({
                title: 'Server side error',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        })
    }

    const handleClick=((id)=>{
        
        navigate(`/seller-order-detail/${id}`)
    })

    return (
        <React.Fragment>
            <DashboardLayout>
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"}>Orders</Text>
                    </Box>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Order id </Th>
                                    <Th> Address</Th>
                                    <Th>City </Th>
                                    <Th>State</Th>
                                    <Th>Country</Th>
                                    <Th>Pin code </Th>
                                    <Th>Phone no </Th>
                                    <Th> Payment id  </Th>
                                    <Th> Payment status  </Th>
                                    <Th> Total Amount </Th>
                                    <Th> Order Placed At </Th>
                                    <Th> Change Order Status </Th>
                                    <Th> Delivered At</Th>
                                    <Th> Cancel Order</Th>

                                </Tr>
                            </Thead>
                            <Tbody>

                                {
                                    orders.map((item)=>{
                                        const users=item.orderItems.map((product)=>product.user)
                                        if(users.includes(JSON.parse(localStorage.getItem('profile')).id+"")){
                                            return <>
                                               <Tr key={item._id}  >
                                            <Td onClick={()=>handleClick(item._id)} style={{ color:"blue" ,cursor :"pointer"}}>{item._id}</Td>
                                            <Td>{item.shippingInfo.address}</Td>
                                            <Td>{item.shippingInfo.city}</Td>
                                            <Td isNumeric>{item.shippingInfo.state}</Td>
                                            <Td>{item.shippingInfo.country}</Td>
                                            <Td> {item.shippingInfo.pincode}</Td>
                                            <Td>{item.shippingInfo.phone}</Td>
                                            <Td>{item.paymentInfo.id}</Td>
                                            <Td>{item.paymentInfo.status}</Td>
                                            <Td>{item.totalPrice}</Td>
                                            <Td>{item.createdAt}</Td>
                                            <Td>
                                        <Stack spacing={3}>
                                            <Select placeholder={item.orderStatus}  onChange={(e)=>handleChange(e,item._id)}>
                                                <option value='Ordered'>Ordered</option>
                                                <option value='Shipped'>Shipped</option>
                                                <option value='Delivered'>Delivered</option>
                                            </Select>
                                        </Stack>
                                    </Td>    
                                    <Td>{item.deliveredAt?item.deliveredAt:'Not yet delivered'}</Td>
                                            <Td>
                                                <Button onClick={() => handleDelete(item._id)} >
                                                    <Tooltip label='Remove product from cart' fontSize='md'>
                                                        <DeleteIcon />
                                                    </Tooltip>
                                                </Button>
                                            </Td>

                                        </Tr>
                                            </>
                                        }
                                    })
                                }
                                
                            </Tbody>

                        </Table>
                    </TableContainer>
                </Box>

            </DashboardLayout>
        </React.Fragment>
    );
}