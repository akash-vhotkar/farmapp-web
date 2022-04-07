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
                    <Container maxW='2xl'  >
  <Box padding={2} color='black' maxW='md'>
                    {
                        products.map(item => (




                           
                    <Box maxW='sm' key={item._id} borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Image src= {item.images[0]}  style={{width:"300px", height:"300px"}} alt={"image"} />

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
</Container>

                </Box>
            </HomeLayout>
        </React.Fragment>
    );
}