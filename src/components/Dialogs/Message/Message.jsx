import style from './../Dialogs.module.css';

const Messages = ({user, message}) =>{
    return(
        <div><div className={user ? style.userMessage : style.otherMessage}>{message}</div></div>
    );
}
export default Messages;