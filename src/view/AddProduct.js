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
const url="http://localhost:4000"

export default function SimpleCard() {
    const [errcheck,setErrcheck]=useState(false);
    const navigate=useNavigate();
    const [productData,setproductData]=useState({name:'',description:'',price:'',rating:'',image:'',category:'',stock:''});                                  

    
    const handleSubmit=((e)=>{
    //   if(!productData.name ||  !productData.description || !productData.price ||  
    //     !productData.rating || !productData.category ||  !productData.stock){
    //     setErrcheck("Kindly fill in all fields.")
    //   }
    //   else{
        console.log(productData)

        axios.post(`${url}/api/v1/admin/product/new`,productData,{headers:{
            cookies:JSON.parse(localStorage.getItem('profile')).token
        }})
          .then((res)=>{
            console.log(res);
            if(res.data.user.role==="user"){
              navigate('/home')
            }
            else{
              navigate('/')
            }
          })
          .catch((err)=>{
            
            setErrcheck("Username or password incorrect");
          })
    //   }
    })

    const handleChange=(e)=>{
        setproductData({...productData,[e.target.name]:e.target.value})
    }

    const encode=(e)=>{
       
        const file=e.target.files[0];
       
        if(200<file.size/1024){
            setErrcheck('The file size cannot exceed 200kb')
        }
        else{
            var fileReader = new FileReader();
            fileReader.onload = function(fileLoadedEvent) {
                const srcData = fileLoadedEvent.target.result;
                // productData.image=srcData // og code
                console.log(srcData)
                setproductData({...productData,[e.target.name]:srcData})
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
                    <p>{errcheck}</p>
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
                            <input onChange={(e)=>encode(e)} name="image" type="file" /> 
                            {productData.image!=='' && <img alt=" "src={productData.image}></img>}
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