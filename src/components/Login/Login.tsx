import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLength, requiredField } from "../../utils/Validators";
import { createField, Input } from "../common/FormControls/FormControls";
import { Navigate } from "react-router-dom";
import style from "../common/FormControls/FormControls.module.css";
import { MapDispatchPropsTypeLogin, MapStatePropsTypeLogin } from "./LoginContainer";

const maxLength30 = maxLength(30);

interface LoginFormOwnProps {
    captcha: string | null
    children?: JSX.Element|JSX.Element[];
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>  = ({handleSubmit, error, captcha})=>{
    
    return(<div>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {createField<LoginFormValuesKeys>("Email","email", [requiredField, maxLength30], Input)}
            {createField<LoginFormValuesKeys>("Password","password", [requiredField, maxLength30], Input, {type: "password"})}
            {createField<LoginFormValuesKeys>(undefined,"rememberMe", [], Input, {type: "checkBox"}, "Remember me")}
            {error && <div className={style.formSummaryError}>{error}</div>}
            {captcha && <img src={captcha}/>}
            {captcha && createField<LoginFormValuesKeys>("Symbols from picture","captcha", [requiredField], Input)}
            <div>
                <button>Login</button>
            </div>
        </form>
    </div>);
}
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
}
type LoginFormValuesKeys = Extract<keyof LoginFormValuesType, string>;

const Login: React.FC<MapStatePropsTypeLogin & MapDispatchPropsTypeLogin> = (props)=>{
    const onSubmit=(formData: any)=>{ 
        props.login(formData);
    }
    if(props.isAuth) return <Navigate to={"/profile"}/>

    return(<div>
        <LoginReduxForm onSubmit={onSubmit} captcha={props.captcha}/>
    </div>);
}

export default Login;