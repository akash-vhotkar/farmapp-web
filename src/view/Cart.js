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
import DashboardLayout from '../layout/HomeLayout'
const url = "http://localhost:4000"

export default function SimpleCard() {
    const [cost,setCost]=useState();
    const [quantity,setQuantity]=useState();
    const [numberofItems,setNumberofItems]=useState();
    const navigate = useNavigate()
    const toast = useToast();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if(localStorage.getItem("cart")==null){
            const cart=[];
            setProducts(cart)
            setNumberofItems(cart.length);
            setCost(calc(cart))
        }
        else{
            const cart=JSON.parse(localStorage.getItem("cart"));
            cart.forEach((item)=>{
                item.quantity=1;
            })
            setProducts(cart)
            setNumberofItems(cart.length);
            setCost(calc(cart))
        }
    }, [])

    const calc=((cart)=>{
        var sum=0;
        cart.forEach((i)=>{
            sum=sum+i.price*i.quantity;
        })
        return sum;
    })

    const handleChange=(i,e)=>{
        products.forEach((item)=>{
            if(item._id===i._id){
                item.quantity=e.target.value;
            }
        })
        setProducts(products)
        setCost(calc(products))
    }

    const handleDelete = ((i) => {
        const newproducts=products.filter((item)=>{
            return item._id!==i._id
        })
        localStorage.setItem("cart",JSON.stringify(newproducts))
        setProducts(newproducts)
        setNumberofItems(newproducts.length);
        setCost(calc(newproducts))
        toast({
            title: 'Product removed',
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    })

    return (
        <React.Fragment>
            <DashboardLayout>
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"}>Cart</Text>
                    </Box>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Product  Image</Th>
                                    <Th>Product name </Th>
                                    <Th>Quantity </Th>
                                    <Th>Quantity </Th>
                                    <Th>Price </Th>
                                    <Th>Actions</Th>

                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    products.map(item => (
                                        <Tr key={item._id}  >
                                            <Td>{item.image}</Td>
                                            <Td>{item.name}</Td>
                                            <Td><input onChange={(e)=>handleChange(item,e)} type="number"></input></Td>
                                            <Td>{item.quantity}</Td>
                                            <Td isNumeric>{item.price}</Td>
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
                            <Tfoot>
                                <Tr>
                                    <Th>No of items = {numberofItems}</Th>
                                    <Th>Total Amount= {cost}</Th>
                                    <Th isNumeric></Th>
                                </Tr>
                            </Tfoot>

                        </Table>
                    </TableContainer>
                    <Box>
                        <Button
                            mb={3}
                            mt={4}
                            display={{ base: 'none', md: 'inline-flex' }}
                            fontSize={'sm'}
                            fontWeight={600}
                            color={'white'}
                            bg={'brand.700'}
                            // href={'/signup'}
                        >
                            Place order
                        </Button>

                    </Box>

                </Box>

            </DashboardLayout>
        </React.Fragment>
    );
}