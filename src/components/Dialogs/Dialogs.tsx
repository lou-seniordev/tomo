import DialogItem from './DialogItem/DialogItem';
import style from './Dialogs.module.css';
import Messages from './Message/Message';
import React from 'react';
import DialogContainer from './DialogsForm/DialogsForm';
import { AppStateType } from '../../redux/reduxStore';

type Props = {
    dialogPage:  AppStateType["dialogPage"],
    messageSend: (text: string)=>void
}

const Dialogs: React.FC<Props> = (props)=>{
    let state = props.dialogPage;
    let dialogElements = state.dialogs.map(dialog => <DialogItem id = {dialog.id} key={dialog.id} name = {dialog.name} ava = {dialog.ava}/>);
    let messageElements = state.messages.map(m => <Messages message ={m.message} key={m.id} user={m.id!=3 ? true: false} />);
    let messageSend = (values:any) => props.messageSend(values.messageText);

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