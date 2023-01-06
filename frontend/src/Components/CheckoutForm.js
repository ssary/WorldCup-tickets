import { PaymentElement} from '@stripe/react-stripe-js'
import {useState} from 'react'
import {useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import CreditCardInput from 'react-credit-card-input';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'
import Recaptcha from './Recaptcha';
var _ = require("lodash");

export default function CheckoutForm(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState('');
  const [error, setError] = useState(true);
  const [pay, setPay] = useState(false);

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
      // if(input.length % 4 === 0 && cardNumber.length < 16){
      //   setCardNumber(input + " ");
      // }else{
      //   setCardNumber(input);
      // }
      setCardNumber(input);
    }
    if(e.target.name === "expirationdate"){
        // if(expirationDate === "" && input !== "1" && input !== "0"){
        //     setExpirationDate("0" + input + "/");
        // }else if(expirationDate === ""){
        //     setExpirationDate(input);
        // }else if(expirationDate.length === 1 && input !== "" && _.inRange(input, 1, 3)){
        //     setExpirationDate(input + "/");
        // }else{
        //   setExpirationDate(input);
        // }
        setExpirationDate(input);
        
    }
    if(e.target.name === "cvc"){
        setCvc(input)
    }
  }


  const handleSubmit = async (e) => {
    if(window.recaptchaVerified===true){
      window.location = "https://www.google.com"
    }else{
      alert("reCAPTCHA required")
    }
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
                expirationMonth: expirationDate.split(" / ")[0],
                expirationYear: expirationDate.split(" / ")[1],
                cvc: cvc
            }
        },
        name: props.name,
        phone: props.phone
    }
    // axios.post("http://localhost:5001/api/reservation", JSON.stringify(customerDetails), {headers: {'Content-Type': 'application/json'}});
    console.log(customerDetails);
    setIsLoading(true);
    
  }
  console.log("card number: "+cardNumber);
  console.log("expire date: "+expirationDate);
  console.log("cvc: "+cvc);
  return (
    <div className='checkout-form'>
    <form onSubmit={handleSubmit} id="payment-form">
      {/* <PaymentElement id="payment-element" /> */}
      <div className='checkout-body'>
        {/* <div className='checkout-input-container'> */}
            <label>Card Details</label>
            {/* <input required type="tel" value={cardNumber} pattern="[0-9\s]{13,19}" maxLength="16" onChange={handleChange} name='cardnumber' placeholder='1234 1234 1234 1234' className='input-100'></input> */}
            <CreditCardInput
            cardNumberInputProps={{value: cardNumber, onChange: e => setCardNumber(e.target.value) }} 
            cardExpiryInputProps={{ value: expirationDate, onChange: e => setExpirationDate(e.target.value) }} 
            cardCVCInputProps={{ value: cvc, onChange: e => setCvc(e.target.value) }}
            onError={({ inputName, err }) => {!err? setError(false) : setError(true)}}
            fieldClassName="input"
             />
             <Recaptcha onSubmit={handleSubmit} isLoading={isLoading} />
             
        {/* </div> */}
        {/* <div className='flex-container'>
            <div className='checkout-input-container'>
                <label>Expiration</label>
                <input required onChange={handleChange} value={expirationDate} pattern="([0-9]{2}[/]?){2}" maxLength="5" minLength="5" name='expirationdate' placeholder='MM / YY' className='checkout-input'></input>
            </div>
            <div className='checkout-input-container'>
                <label>CVC</label>
                <input required maxLength="3" minLength="3" onChange={handleChange} name='cvc' pattern='[0-9]+' placeholder='CVC' className='checkout-input'></input>
            </div>
        </div> */}
        
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <p style={{paddingTop: "10px"}}>Quantity {props.quantity}</p>
        <p style={{paddingTop: "10px"}}>Price $123</p>
      </div>
      {/* <button type='submit' className='checkout-btn' disabled={isLoading} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner">Processing ...</div> : "Pay now"}
        </span>
      </button> */}
    </form>
    </div>
  )
}
