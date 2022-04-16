import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button,
    toast,
    useToast

} from '@chakra-ui/react';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

const AddressDetails = ({products,cost,shippingInfo,setShippingInfo}) => {
   
    const url = "http://localhost:4000/api/v1"    
    const toast=useToast()
    const navigate=useNavigate()

    const handleChange=(e)=>{
        setShippingInfo({...shippingInfo,[e.target.id]:e.target.value})
        console.log(shippingInfo)
    }
   

    const onToken = (token) => {
        if(token){
            products.forEach((i)=>{
                i.images=JSON.stringify(i.images[0]);
            })
            console.log(products)
            const data={
                shippingInfo:shippingInfo,
                orderItems:products,
                user:{type:JSON.parse(localStorage.getItem("profile")).id},
                paymentInfo:{
                    id:token.id,
                    status:"success"
                },
                totalPrice:cost,
            }
            axios.post(`${url}/order/new`,data,{headers:{
                    cookies:JSON.parse(localStorage.getItem('profile')).token
                }})
                .then((res)=>{
                    console.log(res)
                    toast({
                        title: 'Payment Success',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })
                    navigate('/seller-orders')
                })
                .catch((error)=>{
                    toast({
                        title: 'Server error',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                    })
                });            
        }
        else{
            toast({
                title: 'Server error',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
    

    return (
        <>
            <div>
                    <FormControl>
                        <FormLabel htmlFor='address'>Enter your address</FormLabel>
                        <Input onChange={handleChange} id='address' type='text' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='state'>Enter your state</FormLabel>
                        <Input onChange={handleChange} id='state' type='text' />
                    </FormControl>   <FormControl>
                        <FormLabel htmlFor='city'>Enter your city</FormLabel>
                        <Input id='city' type='text' onChange={handleChange}/>
                    </FormControl>   <FormControl>
                        <FormLabel htmlFor='country'>Enter your country</FormLabel>
                        <Input id='country' type='text' onChange={handleChange}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='pincode'>Enter your pincode</FormLabel>
                        <Input id='pincode' type='number' onChange={handleChange}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='phone'>Enter your phone no</FormLabel>
                        <Input id='phone' type='number' onChange={handleChange}/>
                    </FormControl>

                    <StripeCheckout
                    currency='inr'
                    amount={cost}
                    token={onToken}
                    stripeKey="pk_test_51HY7eBLXvUk3ZE2kg93zIlH67ftUxoZYGRcem3mddQocLZz3LKwzn1GtPSSNu8GQH4ZJg1Icj4n3HCltZIrfkkZS00incutQb6"
                />
            </div>
        </>
    )
}

export default AddressDetails;