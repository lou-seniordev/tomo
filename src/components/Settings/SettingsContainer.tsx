import React from 'react';
import {connect} from "react-redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {compose} from "redux";
import plug from '../../assets/images/settingPlug.png'
import Settings from './Settings';
import { savePhoto } from '../../redux/profileReducer';
import { setProfile } from '../../redux/profileReducer';
import { AppStateType } from '../../redux/reduxStore';
import { ProfileType, UserType } from '../../types/types';

type MapStatePropsType = {
    user: {
        id: number,
        email: string,
        login: string
    },
    profile: ProfileType
}
type MapDispatchPropsType = {
    setProfile: (userId:number)=>void,
    savePhoto: (photo: File)=>void
}
type Props = MapStatePropsType & MapDispatchPropsType;

class SettingsContainer extends React.Component<Props>{
    componentDidMount(){
        let userId = this.props.user.id;
        this.props.setProfile(userId);
    }
    
    render(){
        return <Settings profile = {this.props.profile} user = {this.props.user}
         savePhoto= {this.props.savePhoto}/>
    }
}
let mapStateToProps = (state: AppStateType)=>{

    return ({
        profile: state.profilePage.profile,
        user: state.auth
    });
}
export default compose(
    connect(mapStateToProps,{savePhoto, setProfile}),
    withAuthRedirect
)(SettingsContainer);