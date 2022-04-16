import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './Checkourform';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HY7eBLXvUk3ZE2kg93zIlH67ftUxoZYGRcem3mddQocLZz3LKwzn1GtPSSNu8GQH4ZJg1Icj4n3HCltZIrfkkZS00incutQb6');

function Stripe() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51HY7eBLXvUk3ZE2kQddnLPrXtFe40ST28tahw4xrzCXfeGOAjlaewqZjkzEUvda2HOTH9oem61Z2IRzzF9kWDEgC008g4piumq',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
