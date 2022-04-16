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
import DashboardLayout from '../layout/HomeLayout';

const url = "http://localhost:4000"

export default function SimpleCard() {

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
                                        <Td> id  </Td>

                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Th>Address </Th>
                                        <Td>address </Td>
                                    </Tr>
                                    <Tr>
                                        <Th>
                                            State city
                                        </Th>
                                        <Td>state </Td>
                                    </Tr>
                                    <Tr>
                                        <Th> No of products</Th>
                                        <Td> 7</Td>
                                    </Tr>
                                    <Tr>
                                        <Th> pincode </Th>
                                        <Td>pincode</Td>
                                    </Tr>
                                    <Tr>
                                        <Th>phone no</Th>
                                        <Td> 787878</Td>
                                    </Tr>
                                    <Tr>
                                         <Th>Payment id </Th>
                                         <Tr> id </Tr>
                                    </Tr>
                                    <Tr>
                                        <Th> Payment  status</Th>
                                        <Th> done</Th>
                                    </Tr>
                                    <Tr>
                                        <Th>Placed at </Th>
                                        <Td> 7878</Td>
                                    </Tr>
                                    <Tr>
                                        <Th> Order status </Th>
                                        <Td> Inprogress </Td>
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
                                    <Tr>
                                        <Td><Avatar name='Oshigaki Kisame' src='https://bit.ly/broken-link' /> </Td>
                                        <Td>name</Td>
                                        <Td> price</Td>
                                        <Td> Quntity </Td>
                                    </Tr>
                                    

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