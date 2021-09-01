import React, {Fragment} from 'react';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";

const Register = () => {
    const[registrationElements, setRegistrationElements] = React.useState({
        first_name: "",
        last_name: "",
        email_address: "",
        password: "",
        mobile_number: ""});

    const {first_name,
        last_name,
        email_address,
        password,
        mobile_number} = registrationElements;

    const inputChangeHandler = (e)=>{
        const state = registrationElements;
        state[e.target.name] = e.target.value;
        setRegistrationElements({...state});
    }

    const invokeRegisterUser = async () =>{
        try{
            const rawResponse = await fetch("http://localhost:8085/api/v1/signup",{
                method: 'POST',
                body: JSON.stringify(registrationElements),
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json;charset=UTF-8"
                }
            });

            const result = await rawResponse.json();

            if (rawResponse.ok){
                console.log("worked");
            }else{
                const error = new Error();
                error.message = result.message || 'Registration Functionality Broke.';
                throw error;
            }
        }catch(e){
            alert(`Error: ${e.message}`);
        }
    }

    const registerUserHandler= () => {
        invokeRegisterUser();
    }

    return(
        <Fragment>
            <ValidatorForm onSubmit={registerUserHandler}>
                <TextValidator
                    id="first_name"
                    label="First Name*"
                    type="text"
                    name="first_name"
                    onChange={inputChangeHandler}
                    value={first_name}
                    validators={['required']}
                    errorMessages={['required']}>
                </TextValidator>
                <br/><br/>
                <TextValidator
                    id="last_name"
                    label="Last Name*"
                    type="text"
                    name="last_name"
                    onChange={inputChangeHandler}
                    value={last_name}
                    validators={['required']}
                    errorMessages={['required']}>
                </TextValidator>
                <br/><br/>
                <TextValidator
                    id="email_address"
                    label="Email*"
                    type="text"
                    name="email_address"
                    onChange={inputChangeHandler}
                    value={email_address}
                    validators={['required']}
                    errorMessages={['required']}>
                </TextValidator>
                <br/><br/>
                <TextValidator
                    id="password"
                    label="Password*"
                    type="password"
                    name="password"
                    onChange={inputChangeHandler}
                    value={password}
                    validators={['required']}
                    errorMessages={['required']}>
                </TextValidator>
                <br/><br/>
                <TextValidator
                    id="mobile_number"
                    label="Contact No. *"
                    type="text"
                    name="mobile_number"
                    onChange={inputChangeHandler}
                    value={mobile_number}
                    validators={['required']}
                    errorMessages={['required']}>
                </TextValidator>
                <br/><br/>
                <Button type="submit" color="primary">Register</Button>
            </ValidatorForm>
        </Fragment>
    )
}

export default Register;