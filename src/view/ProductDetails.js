import {
    Badge,
    Box,
    Button,
    Center,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    FormLabel,
    FormControl,
    Input,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeLayout from '../layout/HomeLayout';
import {StarIcon} from '@chakra-ui/icons';
export default function ProductDetails() {
    const navigate = useNavigate();
    const toast = useToast()
    const [review, setReview] = useState({ rating: '', comment: '' })
    const [reviews, setReviews] = useState([])
    const [product, setProduct] = useState([])
    const url = "https://ecommerce-project-sumit.herokuapp.com"
    const [cart,setCart]=useState([]);

    useEffect(() => {

        if(JSON.parse(localStorage.getItem("cart"))===null){
            setCart([]);
        }
        else{
            setCart(JSON.parse(localStorage.getItem("cart")))
        }

        const id = window.location.pathname.substring(16)
        axios.get(`${url}/api/v1/reviews?id=${id}`)
            .then((res) => {
                setReviews(res.data.reviews)
            })
            .catch((err) => {
                toast({
                    title: 'Server side error',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })

        axios.get(`${url}/api/v1/product/${id}`)
            .then((res) => {
                const newproduct = [];
                newproduct.push(res.data.product)
                setProduct(newproduct)
            })
            .catch((err) => {
                toast({
                    title: 'Server side error',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    }, [])

    const handleClick = (() => {
        console.log(review)
        const id = window.location.pathname.substring(16)

        axios.put(`${url}/api/v1/review`, { rating: review.rating, comment: review.comment, productId: id }
            , {
                headers: {
                    cookies: JSON.parse(localStorage.getItem('profile')).token
                }
            })
            .then((res) => {
                navigate('/products')
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: 'Kindly login',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
    })

    const handleChange = ((e) => {
        setReview({ ...review, [e.target.id]: e.target.value })
    })

    const addtoCart=()=>{
        console.log("IN")
        if(localStorage.getItem("profile")===null){
            toast({
                title: 'Kindly login',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
        else{
            console.log(product[0])
            product[0].quantity=1
            cart.push(product[0]);
            product.quantity=1
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
                {product.map((item) =>
                    <Center py={6} key={item._id}>
                        <Stack
                            borderWidth="1px"
                            borderRadius="lg"
                            w={{ sm: '100%', md: '740px' }}
                            height={{ sm: '476px', md: '20rem' }}
                            direction={{ base: 'column', md: 'row' }}

                            boxShadow={'2xl'}
                            padding={4}>
                            <Flex flex={1} bg="blue.200">
                                <Image
                                    objectFit="cover"
                                    boxSize="100%"
                                    src={
                                        item.images[0]
                                    }
                                />
                            </Flex>
                            <Stack
                                flex={1}
                                flexDirection="column"
                                justifyContent="center"
                                alignItems="center"
                                p={1}
                                pt={2}>
                                <Heading fontSize={'2xl'} fontFamily={'body'}>
                                    {item.name}
                                </Heading>
                                <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                                    Rs {item.price}
                                </Text>
                                <Text
                                    textAlign={'center'}

                                    px={3}>
                                    {item.description}
                                    <Link href={'#'} color={'blue.400'}>
                                        #tag
                                    </Link>

                                </Text>
                                <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
                                    <Badge
                                        px={2}
                                        py={1}

                                        fontWeight={'400'}>
                                        #art
                                    </Badge>
                                    <Badge
                                        px={2}
                                        py={1}

                                        fontWeight={'400'}>
                                        #photography
                                    </Badge>
                                    <Badge
                                        px={2}
                                        py={1}

                                        fontWeight={'400'}>
                                        #music
                                    </Badge>
                                </Stack>

                                <Stack
                                    width={'100%'}
                                    mt={'2rem'}
                                    direction={'row'}
                                    padding={2}
                                    justifyContent={'space-between'}
                                    alignItems={'center'}>
                                    <Button
                                        onClick={addtoCart}
                                        flex={1}
                                        fontSize={'sm'}
                                        rounded={'full'}
                                        bg={'blue.400'}
                                        color={'white'}
                                        boxShadow={
                                            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                                        }
                                        _hover={{
                                            bg: 'blue.500',
                                        }}
                                        _focus={{
                                            bg: 'blue.500',
                                        }}>
                                        Add To Cart
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>


                    </Center>
                )}

                <Center w={"75%"}
                >
                    <Center>
                        <Box>

                            <Text fontSize={"2rem"} fontWeight="bold"> All Reviews</Text>

                        </Box>
                    </Center>


                </Center>
                <Center>
                    {
                        reviews.map((review) =>
                            <Box key={review._id}>
                                <Text fontSize={"1rem"} fontWeight="bold">{review.name}</Text>
                                <Text> {Array(5)
                                    .fill('')
                                    .map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            color={i <review.rating ? 'gold' : 'gray.300'}
                                        />
                                    ))}</Text>
                                <Text>{review.comment}</Text>
                            </Box>
                        )

                    }
                </Center>
                <Center>
                    <Center w={"75%"} m={5}>
                        <Box>
                            
                            <FormControl>
                                <FormLabel htmlFor='rating'>Add rating</FormLabel>
                                <Input onChange={(e) => handleChange(e)} w={"600px"} id='rating' type='text' size='lg' />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='comment'>Enter comment</FormLabel>
                                <Input onChange={(e) => handleChange(e)} w={"600px"} id='comment' type='text' size='lg' />
                            </FormControl>
                            <Button w={"600px"} varient="solid" onClick={handleClick}>
                                Add reviews
                            </Button>
                        </Box>
                    </Center>
                </Center>
            </HomeLayout>
        </React.Fragment>
    );
}