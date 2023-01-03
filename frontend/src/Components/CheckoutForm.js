import { PaymentElement} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';

export default function CheckoutForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");

  const price1 = props.matchInfo.availability.category1.price;
  const price2 = props.matchInfo.availability.category2.price;
  const price3 = props.matchInfo.availability.category3.price;

  function getPrice(c){
    if(c === 1){
        return price1
    }
    if(c ===2){
        return price2
    }
    return price3
}

  function handleChange(e){
    var input = e.target.value;
    if(e.target.name === "cardnumber"){
        setCardNumber(input);
    }
    if(e.target.name === "expirationdate"){
        setExpirationDate(input)
    }
    if(e.target.name === "cvc"){
        setCvc(input)
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerDetails = {
        reservation: {
            email: props.email,
            matchNumber: props.matchInfo.matchNumber,
            tickets: {
                category: props.category,
                quantity: props.quantity,
                price: getPrice(props.category)
            },
            card: {
                number: cardNumber,
                expirationMonth: expirationDate,
                expirationYear: expirationDate,
                cvc: cvc
            }
        },
        name: "omar",
        phone: props.phone
    }
    // axios.post("http://localhost:5001/api/reservation", JSON.stringify(customerDetails), {headers: {'Content-Type': 'application/json'}});
    console.log(customerDetails);
    setIsLoading(true);
  }

  return (
    <div className='checkout-form'>
    <form id="payment-form">
      {/* <PaymentElement id="payment-element" /> */}
      <div className='checkout-body'>
        <div className='checkout-input-container'>
            <label>Card number</label>
            <input onChange={handleChange} name='cardnumber' placeholder='1234 1234 1234 1234' className='input-100'></input>
            
        </div>
        <div className='flex-container'>
            <div className='checkout-input-container'>
                <label>Expiration</label>
                <input onChange={handleChange} name='expirationdate' placeholder='MM / YY' className='checkout-input'></input>
            </div>
            <div className='checkout-input-container'>
                <label>CVC</label>
                <input onChange={handleChange} name='cvc' placeholder='CVC' className='checkout-input'></input>
            </div>
        </div>
        
      </div>
      <button onClick={handleSubmit} className='checkout-btn' disabled={isLoading} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner">Processing ...</div> : "Pay now"}
        </span>
      </button>
    </form>
    </div>
  )
}
