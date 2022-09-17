import React from "react";
import style from "./Users.module.css"
import noPic from "./../../assets/images/default.jpg"
import { NavLink } from "react-router-dom";
import { UserType } from "../../types/types";

type Props = {
    user: UserType, 
    followingInProgress: Array<number>, 
    unfollow: (userId: number)=>void, 
    follow: (userId: number)=>void
}

let User: React.FC<Props> = ({user, followingInProgress, unfollow, follow})=>{    
return(<div>
<span>
    <NavLink to={'/profile/'+user.id}><div><img alt={user.name} src={user.photos.small != null ? user.photos.small: noPic} className={style.profPic}/></div></NavLink>
    <div>{user.followed ? <button  disabled={followingInProgress.some(id=>id===user.id)} onClick={()=>{ unfollow(user.id)}}>Unfollow</button> :
     <button disabled={followingInProgress.some(id=>id===user.id)} onClick={()=>{follow(user.id)}}>Follow</button>}</div>
</span>
<span>
    <span>
        <div>{user.name}</div>
        <div>{user.status}</div>
    </span>
    <span>
        <div>{"user.location.city"}</div>
        <div>{"user.location.country"}</div>
    </span>
</span>
</div>)

}
export default User;