import Profile from './Profile';
import React from 'react';
import {connect} from 'react-redux';
import { setProfile, setStatus, updateStatus, saveProfile } from '../../redux/profileReducer';
import { Navigate, useParams } from 'react-router-dom';
import {compose} from "redux";
import { ProfileType } from '../../types/types';

type Props = {
  match: any,
  authorizedUserId: number,
  setProfile: (userId: number)=>void,
  setStatus: (userId: number)=>void,
  profile: ProfileType,
  updateStatus: (status:string)=>void,
  saveProfile: (formData: any)=>void,
  status: string
}

export function withRouter(Children:any){
  return(props:any)=>{
     const match  = {params: useParams()};
     return <Children history={props.history} {...props}  match = {match}/>
 }
}

class ProfileContainer extends React.Component<Props>{
  
  refreshProfile(){   
     
    let userId = this.props.match.params.userId;
    if(!userId)
    {
      userId = this.props.authorizedUserId;
      // if(!userId)   
      // return <Navigate to={"/login"}/>;
    }

    if(userId)
    {
    this.props.setProfile(userId);
    this.props.setStatus(userId);  
    }
      
  }
  componentDidMount(){
    this.refreshProfile();
  }
  componentDidUpdate(prevProps:Props){
    if(this.props.match.params.userId !== prevProps.match.params.userId)
    this.refreshProfile();
  }
    render(){
        if(!this.props.authorizedUserId && !this.props.match.params.userId) 
            return <Navigate to={"/login"}/>;
        return<div>        
          <Profile {...this.props} profile={this.props.profile} 
          updateStatus={this.props.updateStatus} status={this.props.status} isOwner={!this.props.match.params.userId}
          saveProfile={this.props.saveProfile}>
          </Profile>
        </div>}
    };



let mapStateToProps = (state: any)=>({
 profile: state.profilePage.profile,
 status: state.profilePage.status,
 authorizedUserId: state.auth.id,
 isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, { setProfile, setStatus, updateStatus, saveProfile}),
  withRouter  
  // withAuthRedirect
)(ProfileContainer);
