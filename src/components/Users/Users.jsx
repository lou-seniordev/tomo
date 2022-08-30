import React from "react";
import style from "./Users.module.css"
import Pagination from "../common/Paginator/pagination";
import User from "./User";


let Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props})=>{    
return(<div className={style.users}>     
    
    {
    props.users.map(u=><User key={u.id} user = {u} followingInProgress={props.followingInProgress} 
                            unfollow={props.unfollow} follow={props.follow} />)
    }
    <Pagination currentPage={currentPage} totalItemsCount={totalUsersCount}
                pageSize={pageSize} onPageChanged = {onPageChanged}/>                        
        </div>);
}
export default Users;