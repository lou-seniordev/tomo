import React from "react";
import style from "./pagination.module.css"

let Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged})=>{
    
    let pageCount = Math.ceil(totalUsersCount/pageSize);
    let pages = [];

    for(let i = 1; i<=(pageCount);i+=100)
    pages.push(i);   
return(<div>{pages.map(p=>{
        return <span className={currentPage === p && style.selectedPage}
         onClick={(e)=>{ onPageChanged(p); }}>{p} </span>
    })}</div>      
);
}
export default Pagination;