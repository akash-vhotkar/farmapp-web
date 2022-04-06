import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Grid,
    GridItem,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Badge,
    Image,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import Navbar from '../layout/HomeLayout';
import { DeleteIcon, InfoIcon,StarIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Navigate, useNavigate} from  'react-router-dom';

import  {useState, useEffect } from 'react';
const url = "http://localhost:4000"


export default function SimpleCard() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`${url}/api/v1/products`)
            .then((res) => {
                console.log(res);
                setProducts(res.data.products);
            })
            .catch((err) => {
                // setErrcheck("no products ");
            })
    }, [])

    return (
        <React.Fragment>
            <HomeLayout>
                <Box
                    minH={'100vh'}

                    bg={useColorModeValue('text.100', 'text.100')}>

                    <Flex minH={'30vh'}
                        align={'center'}
                        justify={'center'}
                        bg={useColorModeValue('text.100', 'text.100')}>
                        <Flex>
                            <Input type={"text"} width={"500px"} placeholder="Search Product here" />
                            <Button variant={"solid"} marginLeft={"30px"} >Search </Button>
                        </Flex>

                    </Flex>
                    {
                        products.map(item => (




                           
                    <Box maxW='sm' key={item._id} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Image src= 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9' alt={"image"} />

                    <Box p='6'>
                        <Box display='flex' alignItems='baseline'>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                New
                            </Badge>
                            <Box
                                color='gray.500'
                                fontWeight='semibold'
                                letterSpacing='wide'
                                fontSize='xs'
                                textTransform='uppercase'
                                ml='2'
                            >
                          {item.name}
                            </Box>
                        </Box>

                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                            isTruncated
                        >
                            {item.name}
                        </Box>

                        <Box>
                        {item.description}
                        {item.price}
                        {item.Stock}
                        {item.caategory}
                            <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box>
                        </Box>

                        <Box display='flex' mt='2' alignItems='center'>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        color={i < item.ratings ? 'teal.500' : 'gray.300'}
                                    />
                                ))}
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                {3} reviews
                            </Box>
                        </Box>
                    </Box>
                </Box>


                        ))
                    }

                </Box>
            </HomeLayout>
        </React.Fragment>
    );
}