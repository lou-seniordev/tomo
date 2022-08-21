import style from './../Dialogs.module.css';


const Messages = (props) =>{
    return(
        <div><div className={props.user ? style.userMessage : style.otherMessage}>{props.message}</div></div>
    );
}
export default Messages;