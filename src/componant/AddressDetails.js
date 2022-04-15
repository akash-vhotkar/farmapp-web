import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Button,
    toast

} from '@chakra-ui/react';
import StripeCheckout from 'react-stripe-checkout';

const AddressDetails = () => {
    const onToken = (token) => {
        if(token){
            fetch('/payment/process', {
                method: 'POST',
                body: JSON.stringify(token),
            }).then(response => {
                response.json().then(data => {
                    alert(`We are in business, ${data.email}`);
                }).catch(error=>{
                    /**
                     * todo
                     * payment failed
                     */
                    
                });
            });

        }
        else{
            /***
             * todo
             * payment failed 
             * 
             */
            
        }
        
    }
    const onOpened = () => {

    }
    const onClosed = () => {

    }

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
                <StripeCheckout
                    token={onToken}
                    stripeKey="pk_test_51HY7eBLXvUk3ZE2kg93zIlH67ftUxoZYGRcem3mddQocLZz3LKwzn1GtPSSNu8GQH4ZJg1Icj4n3HCltZIrfkkZS00incutQb6"
                />
            </div>
        </>
    )
}

export default AddressDetails;