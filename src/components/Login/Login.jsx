import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLength, requiredField } from "../../utils/Validators";
import { createField, Input } from "../common/FormControls/FormControls";
import { Navigate } from "react-router-dom";
import style from "../common/FormControls/FormControls.module.css";

const maxLength30 = maxLength(30);

const LoginForm = ({handleSubmit, error})=>{
    
    return(<div>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {createField("Email","login", [requiredField, maxLength30], Input)}
            {createField("Password","password", [requiredField, maxLength30], Input, {type: "password"})}
            {createField(null,"rememberMe", null, Input, {type: "checkBox"}, "Remember me")}
            {error && <div className={style.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
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