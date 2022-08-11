import { async } from '@firebase/util';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Button } from '../button/button.component';


import './payment-form.styles.scss'

const PaymentForm = ()=>{

    const stripe = useStripe()
    const elements = useElements()

    const paymentHandler = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const response = await fetch ('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({amount: 10000})
        }).then(res => res.json())

        console.log(response)

        const {
            paymentIntent: {client_secret },
        } = response

        console.log(client_secret)

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Hung Hoang',
                },
            }
        })

        if (paymentResult.error) {
            alert (paymentResult.error)
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded'){
                alert('payment successful')
            }
        }
    }
    return (
        <div className='payment-form-box' >
            <form onSubmit={paymentHandler} className='payment-form-form' >
                <CardElement/>
                <Button buttonType='inverted'>Pay now</Button>
            </form>
        </div>
        
    )
}

export default PaymentForm