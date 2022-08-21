import { NavLink } from 'react-router-dom';
import style from './../Dialogs.module.css';

const DialogItem = (props) =>{
    return (
    <div className={style.item + ' ' /*+ style.active*/}>
    <NavLink to={"/dialogs/"+props.id}><img src={props.ava} />{props.name}</NavLink>
    </div>);
}

export default DialogItem;