import React from "react";
import style from "./FormControls.module.css";

const FormControl = ({input, meta, child, ...props}) =>{
    const hasError = meta.touched && meta.error;
    return(
        <div className={style.formControl + " " + (hasError ? style.error : "")}>
            {props.children}
            { hasError && <div><span>{meta.error}</span></div>}
        </div>
    ) 
}

export const Textarea = (props) =>{
    const {input, meta, ...restProps} = props;
    return(<FormControl {...props}><textarea {...input} {...restProps}/></FormControl>)
}

export const Input = (props) =>{
    const {input, meta, ...restProps} = props;
    return(<FormControl {...props}><input {...input} {...restProps}/></FormControl>)
}