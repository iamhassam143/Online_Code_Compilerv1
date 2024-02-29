import React, { useState } from 'react';
import '../Signin.css'; // Import CSS file for styling

function Signin() {
    const [showSignIn, setShowSignIn] = useState(true);

    const handleToggleForm = () => {
        setShowSignIn(!showSignIn);
    };

    return (
        
        <div className="container-signin">
            <div className="form-container">
                {showSignIn ? (
                    <div className="sign-in">
                        <h2>Sign In</h2>

                        <input type="text" placeholder="Email/Phone Number" className="input-field" />
                        <input type="password" placeholder="Password" className="input-field" />
                        <button className="submit-button">Sign In</button>

                        <button onClick={handleToggleForm}>Switch to Sign Up</button>
                    </div>
                ) : (
                    <div className="sign-up">
                        <h2>Sign Up</h2>
                        <form>
                            <input type="text" id="username" name="username" placeholder='Enter Unique Username' />
                            <input type="text" id="emailPhone" name="emailPhone" placeholder='Enter Email/Phone Number' />
                            <button id='otp' type="button">Send OTP</button>
                            <input type="password" id="password" name="password" placeholder='Create Password' />
                            <button type="submit">Sign Up</button>
                        </form>


                        <button onClick={handleToggleForm}>Switch to Sign In</button>
                    </div>
                )}
            </div>
        </div>
       
    );
}

export default Signin;
