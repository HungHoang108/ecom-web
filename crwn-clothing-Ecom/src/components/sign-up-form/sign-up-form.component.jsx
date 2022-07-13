import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { FormInput } from "../form-input/form-input.component";
import './sign-up-form.styles.scss'
import { Button } from "../button/button.component";

const SignUp = () => {
    const [formField, setFormField] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmedPassword: ""
    });
    const {displayName, email, password, confirmedPassword} = formField;

    const handleChange = (event) =>{
        const {name, value} = event.target;
        
        setFormField((prev) =>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleSubmit = async (event)=> {
        event.preventDefault()
        if (password !== confirmedPassword){
            alert("passwords do not match")
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword (email, password);
            await createUserDocumentFromAuth(user, {displayName})
        }catch(error) {
            console.log(error)
        }

        setFormField({
            displayName: "",
            email: "",
            password: "",
            confirmedPassword: ""
        })   
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form >
                <FormInput label="Username" type="text" required onChange={handleChange} name="displayName" value={displayName} />
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password} />
                <FormInput label="Confirm password" type="password" required onChange={handleChange} name="confirmedPassword" value={confirmedPassword} />
                <Button onClick={handleSubmit}>Sign up</Button>
            </form>
        </div>
    )
}

export default SignUp;