import { NavLink } from 'react-router-dom';
import style from './../Dialogs.module.css';

type Props = {
    id: number,
    ava: string,
    name: string
}

const DialogItem = (props: Props) =>{
    return (
    <div className={style.item + ' ' /*+ style.active*/}>
    <NavLink to={"/dialogs/"+props.id}><img src={props.ava} />{props.name}</NavLink>
    </div>);
}

export default DialogItem;