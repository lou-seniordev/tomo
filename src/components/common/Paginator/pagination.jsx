import React, {useState} from "react";
import style from "./pagination.module.css";
import cn from "classnames";

let Pagination = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10})=>{
    
    let pageCount = Math.ceil(totalItemsCount/pageSize);
    let pages = [];
    for(let i = 1; i<=(pageCount);i++)
    pages.push(i);  

    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionBorder = (portionNumber-1) * portionSize + 1;
    let rightPortionBorder = portionNumber * portionSize;
    

     
return(
    <div className={style.pagination}>
        {portionNumber > 1 && <button onClick={()=>{setPortionNumber(portionNumber - 1)}} className={style.prevPageBtn}>❮</button>}
        {pages.filter(p=> p>=leftPortionBorder && p<=rightPortionBorder)
        .map(p=>{
                  return <span className={ cn (
                    {[style.selectedPage] : currentPage === p ,
                     [style.pageNumber] : style.pageNumber}
                    )}
                    key = {p}
                    onClick={(e)=>
                    { onPageChanged(p); }
                    }>{p} </span>
        })}
        {portionNumber < portionCount && <button onClick={()=>{setPortionNumber(portionNumber + 1)}} className={style.nextPageBtn}>❯</button>}
    </div>      
);
}
export default Pagination;