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
    Thead, Tbody,
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
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"} textAlign={"center"}>Add Product  </Text>
                    </Box>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Product Name </FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Product Description</FormLabel>
                            <Input type="password" />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                variant={"solid"}
                            >
                                Add
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

            </DashboardLayout>
        </React.Fragment>
    );
}