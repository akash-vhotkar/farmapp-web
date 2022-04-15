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
    Input
} from '@chakra-ui/react';
import React from 'react';
import HomeLayout from '../layout/HomeLayout';
export default function socialProfileWithImageHorizontal() {
    return (
        <React.Fragment>
            <HomeLayout>
                <Center py={6}>
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
                                    'https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ'
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
                                Product name
                            </Heading>
                            <Text fontWeight={600} color={'gray.500'} size="sm" mb={4}>
                                Price
                            </Text>
                            <Text
                                textAlign={'center'}

                                px={3}>
                                description of the product
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
                <Center w={"75%"}
                >
                     <Center>
                    <Box>
                       
                            <Text fontSize={"2rem"} fontWeight="bold"> All Reviews</Text>
                       
                    </Box>
                    </Center>


                </Center>
                <Center>
                    <Box>
                        <Text fontSize={"1rem"} fontWeight="bold">email</Text>
                        <Text>messages of the review</Text>

                    </Box>
                </Center>
                <Center>
                    <Center w={"75%"} m={5}>
                        <Box>
                            <FormControl>
                                <FormLabel htmlFor='email' >Enter email</FormLabel>
                                <Input id='email' w={"600px"} size='lg' style={{ width: "100%" }} type='text' />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor='email'>Enter message</FormLabel>
                                <Input w={"600px"} id='email' type='text' size='lg' />
                            </FormControl>
                            <Button w={"600px"} varient="solid">
                                Add reviews
                            </Button>
                        </Box>
                    </Center>
                </Center>
            </HomeLayout>
        </React.Fragment>
    );
}