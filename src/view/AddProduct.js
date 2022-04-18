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
import React,{useState} from 'react';
import DashboardLayout from '../layout/DashboardLayout'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { FaImages } from 'react-icons/fa';
import { useToast } from '@chakra-ui/react'
const url="http://localhost:4000"

export default function SimpleCard() {
    const toast = useToast()
    const navigate=useNavigate();
    const [productData,setproductData]=useState({name:'',description:'',price:'',rating:'',images:[],category:'',stock:''});                                  

    
    const handleSubmit=((e)=>{
      if(!productData.name ||  !productData.description || !productData.price ||  
        !productData.rating || !productData.category ||  !productData.stock || productData.images[0]==='' || productData.images[1]==='' ){
            toast({
                title: 'Kindly fill in all fields.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
      }
      else{
        console.log(productData)
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        axios.post(`${url}/api/v1/admin/product/new`,productData,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
          .then((res)=>{
            console.log(res);
            navigate('/seller-products')
          })
          .catch((err)=>{
              console.log(err)
            toast({
                title: 'Server side error',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
          })
      }
    })

    const handleChange=(e)=>{
        setproductData({...productData,[e.target.name]:e.target.value})
    }

    const encode=(e,index)=>{
        const file=e.target.files[0];
        // console.log(file.size)
        if(typeof file==='undefined'){
            productData.images[index]='';
            console.log(productData.images)
        }
        else if(100<file.size/1024){
            toast({
                title: 'File size cannot exceed 8 kb',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              
        }
        else{
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) {
                const srcData = fileLoadedEvent.target.result;
                productData.images[index]=srcData;
                setproductData(productData)
            }
            fileReader.readAsDataURL(file);
        } 
    }

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
                            <Input onChange={handleChange} name="name" type="text" />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Product Description</FormLabel>
                            <Input onChange={handleChange} name="description" type="text" />

                        </FormControl>
                        <FormControl id="price">
                            <FormLabel>Price</FormLabel>
                            <Input onChange={handleChange} name="price" type="number" />    
                        </FormControl>
                        <FormControl id="rating">
                            <FormLabel>Rating</FormLabel>
                            <Input onChange={handleChange} name="rating" type="number" />    
                        </FormControl>
                        <FormControl id="img">
                            <FormLabel>Add Image</FormLabel>
                            <input onChange={(e)=>encode(e,0)} name="image1" type="file" /> 
                            {productData.images[0]!=='' && <img alt=" "src={productData.images[0]}></img>}
                        </FormControl>
                        <FormControl id="img">
                            <FormLabel>Add Image</FormLabel>
                            <input onChange={(e)=>encode(e,1)} name="image2" type="file" /> 
                            {productData.images[1]!=='' && <img alt=" "src={productData.images[1]}></img>}
                        </FormControl>
                        <FormControl id="category">
                            <FormLabel>Category</FormLabel>
                            <Input onChange={handleChange} name="category" type="text" />    
                        </FormControl>
                        <FormControl id="stock">
                            <FormLabel>Stock</FormLabel>
                            <Input onChange={handleChange} name="stock" type="number" />    
                        </FormControl>
                        <Stack spacing={10}>
                            <Button onClick={handleSubmit}
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