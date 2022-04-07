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
    Td,
    Th,
    Thead,Tbody,
    TableCaption,
    Tfoot,
    Link,

    GridItem,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import DashboardLayout from '../layout/DashboardLayout'
import {ExternalLinkIcon} from '@chakra-ui/icons';

export default function SimpleCard() {
    return (
        <React.Fragment>
            <DashboardLayout>
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"}>Centers </Text>
                    </Box>
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Address </Th>
                                    <Th> Location  </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td>Summit enterprice </Td>
                                    <Td>chembur </Td>
                                    <Td><Link isExternal href='https://goo.gl/maps/MMNbnnYA2orvpf897'> <ExternalLinkIcon style={{color :"blue"}}/> </Link></Td>
                                    
                                </Tr>
                                <Tr>
                                    <Td>d enterprice </Td>
                                    <Td>Nashik </Td>
                                    <Td><Link isExternal href=' https://goo.gl/maps/7T27UHfmh3NfEafN8'> <ExternalLinkIcon style={{color :"blue"}}/> </Link></Td>
                                    
                                </Tr>
                                <Tr>
                                    <Td>m enterprice </Td>
                                    <Td>Solapur</Td>
                                    <Td><Link  isExternal href='https://goo.gl/maps/BjD9Asp5k6nDWkCM6'> <ExternalLinkIcon style={{color :"blue"}}/> </Link></Td>
                                    
                                </Tr>
                                
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
               
            </DashboardLayout>
        </React.Fragment>
    );
}