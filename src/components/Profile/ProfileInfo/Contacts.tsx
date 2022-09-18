import React from "react";
import style from './ProfileInfo.module.css';

type PropsType = {
    contactTitle: string, 
    ContactValue: string
}

const Contacts: React.FC<PropsType> = ({contactTitle, ContactValue})=>
{
    return <div className={style.contact}><b>{contactTitle}</b>: {ContactValue}</div>
}
export default Contacts;