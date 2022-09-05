import React from "react";
import style from './ProfileInfo.module.css';
const Contacts = ({contactTitle, ContactValue})=>
{
    return <div className={style.contact}><b>{contactTitle}</b>: {ContactValue}</div>
}
export default Contacts;