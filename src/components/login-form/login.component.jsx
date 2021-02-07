import React, { useState } from 'react'
import "./login.styles.css"
import FormInput from "../form-input/form-input.component"
import LoginButton from "../custom-button/custom-button.component"
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

function LoginComponent() {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    return (
        <div className="bg-primary login-form">
            <div className="login-header">                
                <h1>Welcome Back!</h1>
                <p>We're so excited to see you again!</p>
            </div>
            <div className="login-body">
                <FormInput type="email" onChange={e => setemail(e.target.value)} Label={"Email"}/>
                <FormInput type="password" onChange={e => setpassword(e.target.value)} Label={"Password"}/>
                <LoginButton onClick={() => 
                    {
                        auth.signInWithEmailAndPassword(
                            email,
                            password
                        ).then(userAuth => console.log(userAuth))
                        .catch(err => console.log(err))
                    }
                }
                >Login</LoginButton>
                <LoginButton onClick={signInWithGoogle}>Sign in with Google</LoginButton>
                <br />
                <p>Need an account? <span className="login-link">Register</span></p>
            </div>
        </div>
    )
}

export default LoginComponent
