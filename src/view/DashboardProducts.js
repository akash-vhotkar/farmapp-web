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
import {Link} from  'react-router-dom';

import React, { useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout'
const url = "http://localhost:4000"

export default function SimpleCard() {
    // const user_id=JSON.parse(localStorage.getItem('profile')).id;

    // console.log(user_id);
    // useEffect(()=>{
    //     axios.get(`${url}/api/v1/products`)
    //       .then((res)=>{
    //         console.log(res);

    //       })
    //       .catch((err)=>{
    //         // setErrcheck("no products ");
    //       })
    // },[])
    const products = [
        {
            name: "Sasuke",
            description: "d",
            price: 30000000,
            ratings: 0,
            category: "2",
            Stock: 1,
            numberOfReviews: 0,
            id: "624b08cd095beccba18f52f4"
        }
    ]

    return (
        <React.Fragment>
            <DashboardLayout>
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"}>Products </Text>
                    </Box>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Product  Name</Th>
                                    <Th>Description</Th>
                                    <Th>Price </Th>
                                    <Th>Category</Th>
                                    <Th>Stock </Th>
                                    <Th>Ratings </Th>
                                    <Th> Details or Update </Th>
                                    <Th>Delete  </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    products.map(item => (
                                        <Tr key={item.id}  >
                                            <Td>{item.name}</Td>
                                            <Td>{item.description}</Td>
                                            <Td>{item.category}</Td>
                                            <Td> {item.Stock}</Td>
                                            <Td>{item.ratings}</Td>
                                            <Td isNumeric>{item.price}</Td>
                                            <Td>
                                                <Link to={`/seller-product-detail/${item.id}`}>
                                                    <Tooltip label='Product Details' fontSize='md'>
                                                        <InfoIcon />
                                                    </Tooltip>
                                                </Link>
                                            </Td>
                                            <Td>
                                            <Link to={`/delete-product/${item.id}`}>
                                                <Tooltip label='Delete Product ' fontSize='md'>
                                                    <DeleteIcon />
                                                </Tooltip>
                                                </Link>
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