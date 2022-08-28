import React from "react";
import style from "./Users.module.css"
import Pagination from "../common/Paginator/pagination";
import User from "./User";


let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props})=>{    
return(<div className={style.users}>     
    <Pagination currentPage={currentPage} totalUsersCount={totalUsersCount}
                pageSize={pageSize} onPageChanged = {onPageChanged}/>
    {
    props.users.map(u=><User key={u.id} user = {u} followingInProgress={props.followingInProgress} 
                            unfollow={props.unfollow} follow={props.follow} />)}
        </div>);
}
export default Users;