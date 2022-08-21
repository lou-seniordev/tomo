import React from "react";
import style from "./Users.module.css"
import noPic from "./../../assets/images/default.jpg"
import { NavLink } from "react-router-dom";




let Users = (props)=>{
    
    let pageCount = Math.ceil(props.totalUsersCount/props.pageSize);
    let pages = [];

    for(let i = 1; i<=(pageCount);i+=200)
    pages.push(i);
    
return(<div className={style.users}>     
    <div>{pages.map(p=>{
        return <span className={props.currentPage === p && style.selectedPage}
         onClick={(e)=>{ props.onPageChanged(p); }}>{p} </span>
    })}</div>      
{
props.users.map(u=><div key={u.id}>
<span>
    <NavLink to={'/profile/'+u.id}><div><img alt={u.name} src={u.photos.small != null ? u.photos.small: noPic} className={style.profPic}/></div></NavLink>
    <div>{u.followed ? <button  disabled={props.followingInProgress.some(id=>id===u.id)} onClick={()=>{ props.unfollow(u.id)}}>Unfollow</button> :
     <button disabled={props.followingInProgress.some(id=>id===u.id)} onClick={()=>{props.follow(u.id)}}>Follow</button>}</div>
</span>
<span>
    <span>
        <div>{u.name}</div>
        <div>{u.status}</div>
    </span>
    <span>
        <div>{"u.location.city"}</div>
        <div>{"u.location.country"}</div>
    </span>
</span>
</div>)

}
</div>);
}
export default Users;