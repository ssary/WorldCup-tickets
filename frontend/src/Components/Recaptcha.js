import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

function Recaptcha(props) {
    // const handleSubmit = () => {if(window.recaptchaVerified===true) {window.location = "https://www.google.com"} else {alert("reCAPTCHA required")}};
    const onCaptchaChange = (value) => {
    // Send the reCAPTCHA response to the server for verification
    // Replace YOUR_SERVER_URL with the URL of your server
        axios.post('http://localhost:5000/recaptcha', {
            recaptcha: value
        })
        .then(function (response) {
            if (response.status === 200) {
              window.recaptchaVerified = true;
            } else { 
              window.recaptchaVerified = false; 
              alert("reCAPTCHA Failed");
            }
          })
        .catch(function (error) {
            console.log(error);
        });
    };

    return (
        <div className="Recaptcha">
          <center>Student login form</center>
          <form>
            <div className="container">
              {/* <label>Username: </label>
              <input type="text" placeholder="Enter username" name="username" required />
              <label>Password: </label>
              <input type="password" placeholder="Enter password" name="password" required /> */}
              <ReCAPTCHA sitekey="6LdqR8sjAAAAANtwa3p2UlDEYO7rRkH7WQDJkkkB" onChange={onCaptchaChange}/>
              {/* <button id="login-button" type="submit" onClick={handleSubmit}>Login</button> */}
              <button onClick={() => props.handleSubmit()} className='checkout-btn' disabled={props.isLoading} id="submit">
                <span id="button-text">
                {props.isLoading ? <div className="spinner" id="spinner">Processing ...</div> : "Pay now"}
                </span>
            </button>
            </div>
          </form>
        </div>
      );

}



  export default Recaptcha;