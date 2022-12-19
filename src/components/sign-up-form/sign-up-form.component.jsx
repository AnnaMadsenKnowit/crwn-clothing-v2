import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import './sign-up-form.styles.scss'

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            console.log('name: ', displayName, ', email: ', email, ' password: ', password)
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields()
            alert("success!")

        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert("Cannot create user, email alredy in use")
            } else {
                alert(error.code)
            }
            console.log("user creation encountered an error", error);
        }
        
        // console.log('name: ', displayName, ', email: ', email, ' password: ', password)

        // //Check that the password matches
        // if (password !== confirmPassword) {
        //     alert("Passwords do not match");
        //     return;
        // }

        // const result = await createAuthUserWithEmailAndPassword(displayName, email, password)
        // console.log(result)
        // alert(result)
        // return
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        //...formFields supplies all other fields with their current values
        setFormFields({...formFields, [name]: value }) 
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <p>Sign up with your email and password</p>
            <form onSubmit={(event) => {handleSubmit(event)}}>
                <FormInput
                    label='DisplayName' 
                    type='text'
                    required
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                    // inputOptions = {{
                    //     type:'text',
                    //     required: true, 
                    //     onChange:handleChange,
                    //     name:'displayName', 
                    //     value:displayName 
                    // }}
                />

                <FormInput
                    label='Email' 
                    type='text' 
                    required 
                    onChange={handleChange} 
                    name='email' 
                    value={email} 
                />

                <FormInput
                    label='Password' 
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='password' 
                    value={password} 
                />

                <FormInput
                    label='Confirm password' 
                    type='password' 
                    required 
                    onChange={handleChange} 
                    name='confirmPassword' 
                    value={confirmPassword} 
                />

                <Button type='submit'>Sign up</Button>
            </form>
        </div>
    )
}

export default SignUpForm