import React, {Fragment} from 'react';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";

const Login = () => {

    const[usernamePassword, setUsernamePassword] = React.useState({
        username:'',
        loginPassword:''});

    const {username,loginPassword}=usernamePassword;

    const loginClickHandler=(e)=>{
        console.log(e);
    };

    const inputChangeHandler = (e)=>{
        const state = usernamePassword;
        state[e.target.name] = e.target.value;
        setUsernamePassword({...state});
    }

    return(
        <Fragment>
                <ValidatorForm onSubmit={loginClickHandler}>
                    <TextValidator
                        id="username"
                        label="username*"
                        type="text"
                        name="username"
                        onChange={inputChangeHandler}
                        value={username}
                        validators={['required']}
                        errorMessages={['required']}>
                    </TextValidator>
                    <br/><br/>
                    <TextValidator
                        id="loginPassword"
                        label="password*"
                        type="password"
                        name="loginPassword"
                        onChange={inputChangeHandler}
                        value={loginPassword}
                        validators={['required']}
                        errorMessages={['required']}>
                    </TextValidator>
                    <br/><br/>
                    <Button type="submit" color="primary">Login</Button>
                </ValidatorForm>
        </Fragment>
    )
}

export default Login;