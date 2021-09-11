import React, {Fragment, useReducer} from 'react';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {createStore} from '../bookMovieAppReduxStore'
import {useDispatch, useSelector} from "react-redux";

const Login = (props) => {
        const[usernamePassword, setUsernamePassword] = React.useState({
        username:'',
        loginPassword:''});

    const {username,loginPassword}=usernamePassword;

    //const [state, updateLoggedInFlag] = useReducer(updateLoginStatus,{flag:0});
    const dispatch = useDispatch();

    const invokeAuthenticationControllerAPI = async () => {
        try{
            const authorizationString = 'Basic ' + btoa(`${username}:${loginPassword}`);

            const rawResponse = await fetch(`http://localhost:3000/api/v1/auth/login`,{
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "authorization": `${authorizationString}`
                }});
            if (rawResponse.ok){
                const result = await rawResponse.json();
                props.setButtonLabel("Logout");
                dispatch({"type":"SUCCESSFUL_LOGIN",payload:{"loggedInStatus":true}});
                const values = useSelector(state=>state);
            }else{
                //error occurred
            }
        }catch (e) {
            console.log(e.message||'Something broke');
        }
    }
    const loginClickHandler=(e)=>{
        invokeAuthenticationControllerAPI()
            .catch(error => console.log("error occurred", error));
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