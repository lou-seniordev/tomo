import React from "react";
import { Field, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "../../../utils/Validators";
import style from "./FormControls.module.css";

type FormControlsParamType = {
    children: React.ReactNode
} & WrappedFieldProps;

const FormControl: React.FC< FormControlsParamType> = ({ meta : {touched, error}, children}) =>{
    const hasError = touched && error;
    return(
        <div className={style.formControl + " " + (hasError ? style.error : "")}>
            {children}
            { hasError && <div><span>{error}</span></div>}
        </div>
    ) 
}

export const Textarea: React.FC<WrappedFieldProps> = (props) =>{
    const {input, meta, ...restProps} = props;
    return(<FormControl  {...props}><textarea {...input}   {...restProps}/></FormControl>)
}
//value={props.value}
export const Input: React.FC<WrappedFieldProps> = (props:any) =>{
    const {input, meta, ...restProps} = props;
    return(<FormControl {...props}><input {...input} {...restProps}/></FormControl>)
}


export function createField<FormKeyTypes extends string>(placeHolder: string | undefined,
    name: FormKeyTypes,
    validators: Array<FieldValidatorType>,
    component: any,
    props = {}, text = "") {
    return (

        <div>
            <Field name={name} component={component}
                validate={validators} placeholder={placeHolder}
                {...props} />{text}
        </div>
    );
}
