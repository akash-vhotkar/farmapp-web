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
import { useToast } from '@chakra-ui/react'
import React, {useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout'
const url = "https://ecommerce-project-sumit.herokuapp.com"

export default function SimpleCard() {
    const user_id=JSON.parse(localStorage.getItem('profile')).id;

    // console.log(user_id);
    const navigate=useNavigate()
    const toast=useToast();
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        axios.get(`${url}/api/v1/products`)
          .then((res)=>{
            console.log(res.data.products)
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
        axios.put(`${url}/api/v1/deleteproduct/${item._id}`,item,{headers:{
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
                                {products.map((item)=>{
                                    if(item.user===JSON.parse(localStorage.getItem('profile')).id){
                                        return  (
                                            <Tr key={item._id}  >
                                            <Td>{item.name}</Td>
                                            <Td>{item.description}</Td>
                                            <Td isNumeric>{item.price}</Td>
                          
                                            <Td>{item.category}</Td>
                                            <Td> {item.stock}</Td>
                                            <Td>{item.rating}</Td>
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
                                        )
                                    }
                                })}
                               
                            </Tbody>

                        </Table>
                    </TableContainer>
                </Box>

            </DashboardLayout>
        </React.Fragment>
    );
}