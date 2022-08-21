import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLength, requiredField } from "../../utils/Validators";
import { Input } from "../common/FormControls/FormControls";
import { Navigate } from "react-router-dom";
import style from "../common/FormControls/FormControls.module.css";

const maxLength30 = maxLength(30);

const LoginForm = (props)=>{
    
    return(<div>
        <form onSubmit={props.handleSubmit}>
            <h1>Login</h1>
            <div><Field name={"login"}component={Input} validate={[requiredField, maxLength30]} placeholder="login"/></div>
            <div><Field name={"password"}component={Input} validate={[requiredField, maxLength30]} placeholder="password" type={"password"}/></div>
            <div><Field name={"rememberMe"}component={Input} type={"checkBox"}/>remember me</div>
            {props.error && <div className={style.formSummaryError}>{props.error}</div>}
            <div><button>Login</button></div>
        </form>
    </div>);
}
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);
const Login = (props)=>{
    const onSubmit=(formData)=>{      
        props.login(formData);
    }
    if(props.isAuth) return <Navigate to={"/profile"}/>

    return(<div>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>);
}

export default Login;