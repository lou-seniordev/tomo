import React from 'react';
import {connect} from "react-redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {compose} from "redux";
import plug from '../../assets/images/settingPlug.png'
import Settings from './Settings';
import { savePhoto } from '../../redux/settingsReducer';
import { setProfile } from '../../redux/profileReducer';

let mapStateToProps = (state)=>{

    return ({
        profilePage: state.profilePage.profile,
        user: state.auth,
        userId: null
    });
}

class SettingsContainer extends React.Component{
    // componentDidUpdate(){
    //     this.props.setProfile(this.props.user.id);
    // }
    
    render(){
        // if(!this.props.profilePage || this.props.user.id != this.props.profilePage.userId) {
        //     this.setState({
        //         userId: this.props.user.id
        //     });
        //}
        return <Settings profile = {this.props.profilePage} user = {this.props.user} savePhoto= {this.props.savePhoto}/>
    }
}
export default compose(
    connect(mapStateToProps,{savePhoto,setProfile}),
    withAuthRedirect
)(SettingsContainer);