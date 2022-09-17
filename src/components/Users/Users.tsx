import React from "react";
import style from "./Users.module.css"
import Pagination from "../common/Paginator/pagination";
import User from "./User";
import { UserType } from "../../types/types";

type Props = {
        totalUsersCount: number, 
        pageSize: number, 
        currentPage: number, 
        onPageChanged: (pageNumber: number)=>void       
        users: Array<UserType>,
        followingInProgress: Array<number>,
        unfollow: (userId:number)=>void,
        follow:  (userId:number)=>void          
}

let Users: React.FC<Props> = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props})=>{    
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