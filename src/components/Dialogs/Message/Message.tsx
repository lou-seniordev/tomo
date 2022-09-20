import style from './../Dialogs.module.css';

type Props = {
    user: boolean,
    message : string
}

const Messages: React.FC<Props> = ({user, message}) =>{
    return(
        <div><div className={user ? style.userMessage : style.otherMessage}>{message}</div></div>
    );
}
export default Messages;