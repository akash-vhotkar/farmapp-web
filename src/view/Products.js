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
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import HomeLayout from '../layout/HomeLayout';
import Navbar from '../layout/HomeLayout';


export default function SimpleCard() {
    const user=localStorage.getItem('profile');
    console.log(user);
    return (
        <React.Fragment>
            <HomeLayout>
                <Box
                    minH={'100vh'}

                    bg={useColorModeValue('text.100', 'text.100')}>
                    <p>drv</p>
                    <Flex minH={'30vh'}
                        align={'center'}
                        justify={'center'}
                        bg={useColorModeValue('text.100', 'text.100')}>
                        <Flex>
                            <Input type={"text"} width={"500px"} placeholder="Search Product here" />
                            <Button variant={"solid"} marginLeft={"30px"} >Search </Button>
                        </Flex>

                    </Flex>
                    <Box margin={"100px"}>
                        <Text style={{textAlign:"center", fontSize :"3rem", fontWeight:"bold"}} >Products </Text>
                        <Box padding='6' boxShadow='lg' bg='white'>
                            <SkeletonCircle size='10' />
                            <SkeletonText mt='4' noOfLines={4} spacing='4' />
                        </Box>
                    </Box>

                </Box>
            </HomeLayout>
        </React.Fragment>
    );
}