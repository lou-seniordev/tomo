import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLength } from "../../../utils/Validators";
import { Textarea } from "../../common/FormControls/FormControls";
import style from './DialogForm.module.css';

const maxLength500 = maxLength(500);
const DialogForm = (props)=>{
    return(<div className={style.chatForm}>
        <form onSubmit={props.handleSubmit}>
            <div className={style.chatInputContainer}><Field  name={"messageText"} component={Textarea} validate={[maxLength500]} placeholder={"Message"}></Field></div>
            <div className={style.chatInputButton}><button  >Send</button></div>
        </form>
    </div>)
}
const DialogReduxForm = reduxForm({form: 'dialog'})(DialogForm);

const DialogContainer = (props)=>{
    const onSubmit=(formData)=>{
        props.messageSend(formData);
    }
    return(<div>
        <DialogReduxForm onSubmit={onSubmit}/>
    </div>);
}

export default DialogContainer;