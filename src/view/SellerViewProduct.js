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
import React,{useEffect, useState} from 'react';
import DashboardLayout from '../layout/DashboardLayout'
import {useNavigate} from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
const url="http://localhost:4000"


export default function SimpleCard() {
    const toast=useToast();
    const navigate=useNavigate();
    const [productData,setproductData]=useState({name:'',description:'',price:'',ratings:'',images:[],category:'',Stock:0});                                  
    

    useEffect(()=>{
        const id=window.location.search.substring(4);
        console.log(id)
        axios.get(`${url}/api/v1/product/${id}`)
        .then((res)=>{
            console.log(res.data.product)
            setproductData({...res.data.product})
        })
        .catch((err)=>{
            toast({
                title: 'Server side error',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        })
    },[])

    const handleSubmit=((e)=>{
        console.log(productData)
      if(!productData.name ||  !productData.description || !productData.price ||  
        productData.rating==='' || !productData.category ||  !productData.stock || !productData.images[0] || !productData.images[1]){
            toast({
                title: 'Kindly fill sin all fields',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
      }
      else{
        console.log(productData)
        const id=window.location.search.substring(4);
        axios.put(`${url}/api/v1/admin/product/${id}`,productData,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
          .then((res)=>{
            navigate('/seller-products')
          })
          .catch((err)=>{
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

    const encode=(e,i)=>{
       
        const file=e.target.files[0];
        if(typeof file==='undefined'){
            productData.images[i]='';
            setproductData(productData)
        }

        else if(10<file.size/1024){
            toast({
                title: 'File size cannot exceed more than 8kb',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              productData.images[i]='';
              setproductData(productData)
        }
        else{
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) {
                const srcData = fileLoadedEvent.target.result;
                productData.images[i]=srcData
                setproductData(productData)
                console.log(productData)
            }
            fileReader.readAsDataURL(file);
        } 
    }
    
    return (
        <React.Fragment>
            <DashboardLayout>
                <Box>
                    <Box>
                        <Text fontSize={"1.5rem"} fontWeight="bold" padding={"20px"} textAlign={"center"}>Product Details </Text>
                    </Box>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Product Name </FormLabel>
                            <Input value={productData.name} onChange={handleChange} name="name" type="text" />
                        </FormControl>
                        <FormControl id="description">
                            <FormLabel>Product Description</FormLabel>
                            <Input value={productData.description} onChange={handleChange} name="description" type="text" />

                        </FormControl>
                        <FormControl id="price">
                            <FormLabel>Price</FormLabel>
                            <Input value={productData.price} onChange={handleChange} name="price" type="number" />    
                        </FormControl>
                        <FormControl id="rating">
                            <FormLabel>Rating</FormLabel>
                            <Input value={productData.rating} onChange={handleChange} name="rating" type="number" />    
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
                            <Input value={productData.category} onChange={handleChange} name="category" type="text" />    
                        </FormControl>
                        <FormControl id="stock">
                            <FormLabel>Stock</FormLabel>
                            <Input value={productData.stock} onChange={handleChange} name="stock" type="number" />    
                        </FormControl>
                        <Stack spacing={10}>
                            <Button onClick={handleSubmit}
                                variant={"solid"}
                            >
                                update  Product 
                            </Button>
                        </Stack>
                    </Stack>
                </Box>

            </DashboardLayout>
        </React.Fragment>
    );
}