import {
    FormControl,
   FormLabel,
   Input ,
   FormHelperText ,
   Button

} from '@chakra-ui/react';


const AddressDetails = () => {
    return (
        <>
            <div>
                    <FormControl>
                        <FormLabel htmlFor='email'>Enter your address</FormLabel>
                        <Input id='email' type='text' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='email'>Enter your state</FormLabel>
                        <Input id='email' type='text' />
                    </FormControl>   <FormControl>
                        <FormLabel htmlFor='email'>Enter your city</FormLabel>
                        <Input id='email' type='text' />
                    </FormControl>   <FormControl>
                        <FormLabel htmlFor='email'>Enter your country</FormLabel>
                        <Input id='email' type='text' />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor='email'>Enter your phone no</FormLabel>
                        <Input id='email' type='number' />
                    </FormControl>
                   
                    <Button
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