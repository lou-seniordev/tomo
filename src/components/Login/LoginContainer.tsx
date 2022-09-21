import React from "react";
import Login from "./Login";
import {connect} from 'react-redux';
import {login} from "../../redux/authReducer";
import { AppStateType } from "../../redux/reduxStore";

type MapStatePropsType = {
    isAuth:boolean,
    captcha: string | null
}
type MapDispatchPropsType = {
    login: (formData: any) => void
}
type Props = MapStatePropsType & MapDispatchPropsType;

class LoginContainer extends React.Component<Props>{
    componentDidUpdate(prevProps: Props){
        if(prevProps.captcha != this.props.captcha)
        {
            this.render();
        }
    }
    render(){
        return <Login {...this.props} captcha={this.props.captcha} login={this.props.login}/>
    }
}
let mapStateToProps = (state: AppStateType):MapStatePropsType=>({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
   });

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {login})(LoginContainer);

