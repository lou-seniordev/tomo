import React from "react";

type Props = {
    status:string,
    updateStatus: (status:string)=>void
}

class ProfileStatus extends React.Component<Props>{  
    state = {
        editMode: false,
        status: this.props.status
    }
    activateEditMode=()=>{
        this.setState({
            editMode: true
        });
    }
    deActivateEditMode=()=>{
        
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }
    onStatusChange=(e:any)=>{
        this.setState({
            status: e.currentTarget.value
        });
    }
    componentDidUpdate(prevProps:Props){
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }
    }
    render(){     
        return(
            <div>
             {!this.state.editMode && 
             <div>
                <div>Status: </div>
                <span onClick={this.activateEditMode}>{this.props.status || "No status"}</span>
             </div>
             }{ this.state.editMode &&
             <div>
                 <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deActivateEditMode} type="text" value={this.state.status}></input>
             </div>
             }
         </div>
        );     
    }
}

export default ProfileStatus;