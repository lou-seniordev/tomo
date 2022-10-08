import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { maxLength } from "../../../utils/Validators";
import { createField, Textarea } from "../../common/FormControls/FormControls";
import { NewMessageFormType } from "../Dialogs";
import style from './DialogForm.module.css';

type DialogFormKeysType = Extract<keyof NewMessageFormType, string>

type Props = {}

const maxLength500 = maxLength(1000);
const DialogForm: React.FC<
InjectedFormProps<NewMessageFormType, Props> & Props> = (props)=>{
    return(<div >
        <form onSubmit={props.handleSubmit} className={style.chatForm}>
            <div className={style.chatInputContainer}>
                {createField<DialogFormKeysType>("Message","messageText", [maxLength500], Textarea)}
            </div>
            <div className={style.chatInputButton}>
                <button>Send</button>
            </div>
        </form>
    </div>)
}
export default reduxForm<NewMessageFormType>({form: 'dialog'})(DialogForm);
