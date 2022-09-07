import React from "react";
import { Field } from "redux-form";
import style from "./FormControls.module.css";

const FormControl = ({input, meta : {touched, error}, children}) =>{
    const hasError = touched && error;
    return(
        <div className={style.formControl + " " + (hasError ? style.error : "")}>
            {children}
            { hasError && <div><span>{error}</span></div>}
        </div>
    ) 
}

export const Textarea = (props) =>{
    const {input, meta, ...restProps} = props;
    return(<FormControl  {...props}><textarea {...input}   {...restProps}/></FormControl>)
}
//value={props.value}
export const Input = (props) =>{
    const {input, meta, ...restProps} = props;
    return(<FormControl {...props}><input {...input} {...restProps}/></FormControl>)
}

export const createField = (placeHolder, name, validators, component, props = {}, text = "") => (
    <div><Field name={name} component={component} validate={validators} placeholder={placeHolder} {...props}/>{text}</div>
)
