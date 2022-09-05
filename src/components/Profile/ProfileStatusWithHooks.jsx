import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ProfileStatusWithHooks =(props)=>{
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(()=>{
        setStatus(props.status);
    },[props.status]);

    const activateEditMode = ()=>{
        props.isOwner ? setEditMode(true) : setEditMode(false);
    }
    const deactivateEditMode = ()=>{
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange=(e)=>{
        setStatus(e.currentTarget.value);       
    }
     return(
            <div>
             {!editMode && 
             <div>
                <span>Status: </span>
                 <span onClick={activateEditMode}>{props.status || "No status"}</span>
             </div>
             }{ editMode &&
             <div>
                 <input onChange={onStatusChange} autoFocus={true} 
                 onBlur={deactivateEditMode}  type="text" value={status}></input>
             </div>
             }
         </div>
        );
}

export default ProfileStatusWithHooks;