import Profile from './Profile';
import React from 'react';
import {connect} from 'react-redux';
import { setProfile, setStatus, updateStatus } from '../../redux/profileReducer';
import { Navigate, NavigationType, useParams } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {compose} from "redux";
import { useNavigate } from "react-router-dom";

export function withRouter(Children){
  return(props)=>{

     const match  = {params: useParams()};
     return <Children history={props.history} {...props}  match = {match}/>
 }
}

class ProfileContainer extends React.Component{
  componentDidMount(){
    
    let userId = this.props.match.params.userId;
    if(!userId)
    {
      userId = this.props.authorizedUserId;
      if(!this.props.userId){
        // Redirect to login
      }
       
    }
    this.props.setProfile(userId);
    this.props.setStatus(userId);
    // usersAPI.setProfile(userId).then(data => this.props.setUserProfile(data));
    
  }
    render(){
      
        return <div>
          <Profile {...this.props} profile={this.props.profile}
          updateStatus={this.props.updateStatus} status={this.props.status}></Profile>
        </div>
    };
}

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

//connect(mapStateToProps, { setProfile })(withRouter(AuthRedirectComponent));