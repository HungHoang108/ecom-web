import { async } from "@firebase/util";
import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component";
import './sign-in-form.styles.scss'
import { Button } from "../button/button.component";

const SignInForm = () => {
    const [formField, setFormField] = useState({
        email: "",
        password: ""
    });
    const {email, password} = formField;

    const handleChange = (event) =>{
        const {name, value} = event.target;
        console.log(formField)
        
        setFormField((prev) =>{
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
      };

    const handleSubmit = async (event)=> {
        event.preventDefault()

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password)
            
        }catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found': 
                    alert('no user associated with this email')
                    break;
                default :
                    console.log(error);
            }
        }

        setFormField({
            email: "",
            password: ""
        })
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form >
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <div className="buttons-container">
                    <Button onClick={handleSubmit}>SIGN IN</Button>
                    <Button buttonType="google-sign-in" onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>               
                
            </form>
        </div>
    )
}

export default SignInForm;