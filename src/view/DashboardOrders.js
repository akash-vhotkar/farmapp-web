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
const url = "http://localhost:4000"

export default function SimpleCard() {
    // const user_id=JSON.parse(localStorage.getItem('profile')).id;

    // console.log(user_id);
    const navigate = useNavigate()
    const toast = useToast();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`${url}/api/v1/products`)
            .then((res) => {
                console.log(res);
                setProducts(res.data.products);
            })
            .catch((err) => {
                toast({
                    title: 'Server side error.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })

            })
    }, [])

    const handleDelete = ((item) => {
        console.log(JSON.parse(localStorage.getItem('profile')).token)
        axios.put(`${url}/api/v1/seller/product/${item._id}`, item, {
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
                setProducts(products.filter((product) => {
                    if (product._id !== item._id) {
                        return product
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
                                    <Th>Pin code </Th>
                                    <Th>Phone no </Th>
                                    <Th> Payment status  </Th>
                                    <Th> Payment done at</Th>
                                    <Th> Total Amount </Th>
                                    <Th> Order Placed At </Th>
                                    <Th> Change Order Status </Th>
                                    <Th> Cancel Order</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Th>Order id </Th>
                                    <Th> Address</Th>
                                    <Th>City </Th>
                                    <Th>State</Th>
                                    <Th>Pin code </Th>
                                    <Th>Phone no </Th>
                                    <Th> Payment status  </Th>
                                    <Th> Payment done at</Th>
                                    <Th> Total Amount </Th>
                                    <Th> Order Placed At </Th>
                                    <Td>
                                        <Stack spacing={3}>
                                            <Select placeholder='Select option'>
                                                <option value='Ordered'>Option 1</option>
                                                <option value='on the way'>Option 2</option>
                                                <option value='Delivered'>Option 3</option>
                                            </Select>
                                        </Stack>
                                    </Td>
                                    <Td>
                                        <Button >
                                            <Tooltip label='Cancel Order' fontSize='md'>
                                                <DeleteIcon />
                                            </Tooltip>
                                        </Button>
                                    </Td>

                                </Tr>
                                {
                                    products.map(item => (
                                        <Tr key={item._id}  >
                                            <Td>{item.name}</Td>
                                            <Td>{item.description}</Td>
                                            <Td isNumeric>{item.price}</Td>

                                            <Td>{item.category}</Td>
                                            <Td> {item.Stock}</Td>
                                            <Td>{item.ratings}</Td>
                                            <Td>
                                                <Stack spacing={3}>
                                                    <Select placeholder='Ordered' size='xs' />
                                                    <Select placeholder='Pending' size='sm' />
                                                    <Select placeholder='On the way' size='md' />
                                                    <Select placeholder='Delivered' size='lg' />
                                                </Stack>
                                            </Td>
                                            <Td>
                                                <Button onClick={() => handleDelete(item)} >
                                                    <Tooltip label='Remove product from cart' fontSize='md'>
                                                        <DeleteIcon />
                                                    </Tooltip>
                                                </Button>
                                            </Td>

                                        </Tr>


                                    ))
                                }

                            </Tbody>

                        </Table>
                    </TableContainer>
                </Box>

            </DashboardLayout>
        </React.Fragment>
    );
}