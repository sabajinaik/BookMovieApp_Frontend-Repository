import React, {Fragment} from 'react';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";

const Login = () => {

    const[usernamePassword, setUsernamePassword] = React.useState({
        username:'',
        loginPassword:''});

    const {username,loginPassword}=usernamePassword;

    const invokeAuthenticationControllerAPI = async () => {
        try{
            const authorizationString = btoa(`Basic ${username}:${loginPassword}`);
            const rawResponse = await fetch(`http://localhost:8085/api/v1/auth/login`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "authorization": `${authorizationString}`
                }});
            if (rawResponse.ok){
                const result = await rawResponse.json();
            }else{
                //error occurred
            }
        }catch (e) {
            console.log(e.message||'Something broke');
        }
    }
    const loginClickHandler=(e)=>{
        invokeAuthenticationControllerAPI();
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