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
import {Link, Navigate, useNavigate} from  'react-router-dom';

import React, {useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout'
const url = "http://localhost:4000"

export default function SimpleCard() {
    // const user_id=JSON.parse(localStorage.getItem('profile')).id;

    // console.log(user_id);
    const navigate=useNavigate()
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        axios.get(`${url}/api/v1/products`)
          .then((res)=>{
            console.log(res);
            setProducts(res.data.products);
          })
          .catch((err)=>{
            // setErrcheck("no products ");
          })
    },[])

    const handleDelete=((item)=>{
        console.log(JSON.parse(localStorage.getItem('profile')).token)
        axios.put(`${url}/api/v1/seller/product/${item._id}`,item,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
          .then((res)=>{
              console.log("YES");
              navigate('/seller-products')
          })
          .catch((err)=>{
            // setErrcheck("no products ");
            console.log(err)
          })
    })

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
                                        <Tr key={item._id}  >
                                            <Td>{item.name}</Td>
                                            <Td>{item.description}</Td>
                                            <Td>{item.category}</Td>
                                            <Td> {item.Stock}</Td>
                                            <Td>{item.ratings}</Td>
                                            <Td isNumeric>{item.price}</Td>
                                            <Td>
                                                <Link to={`/seller-product-detail?id=${item._id}`}>
                                                    <Tooltip label='Product Details' fontSize='md'>
                                                        <InfoIcon />
                                                    </Tooltip>
                                                </Link>
                                            </Td>
                                            <Td>
                                            <Button onClick={()=>handleDelete(item)} >
                                                <Tooltip label='Delete Product ' fontSize='md'>
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