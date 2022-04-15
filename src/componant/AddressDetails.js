import {
    FormControl,
   FormLabel,
   Input ,
   FormHelperText ,
   Button

} from '@chakra-ui/react';

import React, { useState, useEffect } from 'react';

const AddressDetails = ({shippingInfo,setShippingInfo}) => {
   
    


    const handleChange=(e)=>{
        setShippingInfo({...shippingInfo,[e.target.id]:e.target.value})
        console.log(shippingInfo)
    }

    const handleSubmit=()=>{
        console.log(shippingInfo)
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
                   
                    <Button
                        onClick={handleSubmit}
                        mt={4}
                        colorScheme='brand.700'
                        type='submit'
                    >
                        Make Payment 
                    </Button>
                
                    
            </div>
        </>
    )
}

export default AddressDetails;