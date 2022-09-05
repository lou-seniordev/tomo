import Profile from './Profile';
import React from 'react';
import {connect} from 'react-redux';
import { setProfile, setStatus, updateStatus } from '../../redux/profileReducer';
import { Navigate, useParams } from 'react-router-dom';
import {compose} from "redux";

let anonym = false;
export function withRouter(Children){
  return(props)=>{

     const match  = {params: useParams()};
     return <Children history={props.history} {...props}  match = {match}/>
 }
}

class ProfileContainer extends React.Component{
  refreshProfile(){     
    let userId = this.props.match.params.userId;
    if(!userId)
    {
      userId = this.props.authorizedUserId;
      if(!userId){
        anonym = true;
        //this.props.history.push("/login");
        // Redirect to login
      }      
    }
    this.props.setProfile(userId);
    this.props.setStatus(userId); 
  }
  componentDidMount(){
    this.refreshProfile();
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.match.params.userId !== prevProps.match.params.userId)
    this.refreshProfile();
  }
    render(){
        if(anonym) return <Navigate to={"/login"}/>;
        return<div>        
          <Profile {...this.props} profile={this.props.profile}
          updateStatus={this.props.updateStatus} status={this.props.status} isOwner={!this.props.match.params.userId}></Profile>
        </div>}
    };



let mapStateToProps = (state)=>({
 profile: state.profilePage.profile,
 status: state.profilePage.status,
 authorizedUserId: state.auth.id,
 isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, { setProfile, setStatus, updateStatus }),
  withRouter  
  // withAuthRedirect
)(ProfileContainer);
