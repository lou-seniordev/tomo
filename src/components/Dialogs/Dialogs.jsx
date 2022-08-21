import DialogItem from './DialogItem/DialogItem';
import style from './Dialogs.module.css';
import Messages from './Message/Message';
import React from 'react';
import { Navigate } from "react-router-dom";
import DialogContainer from './DialogsForm/DialogsForm';

const Dialogs = (props)=>{
    let state = props.dialogPage;
    let dialogElements = state.dialogs.map(dialog => <DialogItem id = {dialog.id} key={dialog.id} name = {dialog.name} ava = {dialog.ava}/>);
    let messageElements = state.messages.map(m => <Messages message ={m.message} key={m.id} user={m.id!=3 ? true: false} />);
    let messageSend = (values) => props.messageSend(values.messageText);
    


    return(<div className={style.dialogs}>
        <div className={style.dialogItems}>
            {dialogElements}        
        </div>
        <div className={style.messageBody}>
        <div className={style.messages}>
            {messageElements}            
        </div>
        <div className={style.chatInput}>
                <DialogContainer messageSend={messageSend}/>
        </div>
        </div>
    </div>);
}
export default Dialogs;