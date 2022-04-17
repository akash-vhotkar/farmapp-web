import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Container,
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
    Center,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import Navbar from '../layout/HomeLayout';
import { DeleteIcon, InfoIcon, StarIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
const url = "http://localhost:4000"


export default function SimpleCard() {
    const navigate = useNavigate()
    const toast=useToast()
    const [cart,setCart]=useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("cart"))==null){
            setCart([]);
        }
        else{
            setCart(JSON.parse(localStorage.getItem("cart")))
        }
        axios.get(`${url}/api/v1/products`)
            .then((res) => {
                console.log(res.data.products)
                setProducts(res.data.products);
            })
            .catch((err) => {
                toast({
                    title: 'Server Error',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    }, [])


    const handleSubmit=(item)=>{
        if(localStorage.getItem("profile")===null){
            toast({
                title: 'Kindly login',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else{
            cart.push(item);
            setCart(cart)
            localStorage.setItem("cart",JSON.stringify(cart))
            toast({
                title: 'Product added to Cart',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <React.Fragment>
            <HomeLayout>
            <Center  h='auto' bg='white'>
                <Box
                    minH={'100vh'}
                    w={"75%"}


                    >

                    <Flex minH={'30vh'}
                        align={'center'}
                        justify={'center'}
                        bg={useColorModeValue('text.100', 'text.100')}>
                        <Flex>
                            {/* <Input type={"text"} width={"500px"} placeholder="Search Product here" />
                            <Button variant={"solid"} marginLeft={"30px"} >Search </Button> */}
                            Select Your Favourite 
                        </Flex>

                    </Flex>
                    <Container maxW='2xl'  >
                        <Box padding={2} color='black' maxW='md'>
                            {
                                products.map(item => (





                                    <Box maxW='sm' key={item._id} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                                        <Image src={item.images[0]} style={{ width: "300px", height: "300px" }} alt={"image"} />

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
                                            <Button
                                                onClick={()=>handleSubmit(item)}
                                                as={'a'}
                                                fontSize={'sm'}
                                                fontWeight={400}
                                                variant={'link'}
                                                // href={'/signin'}
                                                >
                                                Add to cart
                                            </Button>


                                            <Box display='flex' mt='2' alignItems='center'>
                                                {Array(5)
                                                    .fill('')
                                                    .map((_, i) => (
                                                        <StarIcon
                                                            key={i}
                                                            color={i < item.ratings ? 'teal.500' : 'gray.300'}
                                                        />
                                                    ))}
                                                <Box onClick={()=> navigate(`/product-detail/${item._id}`)} as='span' ml='2' color='gray.600' fontSize='sm'>
                                                    {3} reviews
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Box>


                                ))
                            }
                        </Box>
                    </Container>

                </Box>
                </Center>
            </HomeLayout>
        </React.Fragment>
    );
}