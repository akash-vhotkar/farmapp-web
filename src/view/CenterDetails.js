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
import DashboardLayout from '../layout/DashboardLayout'

export default function SimpleCard() {
    return (
        <React.Fragment>
            <DashboardLayout>
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"}>Center Details </Text>
                    </Box>
                    <Box>
                    the box of center details 
                    </Box>
                </Box>
               
            </DashboardLayout>
        </React.Fragment>
    );
}