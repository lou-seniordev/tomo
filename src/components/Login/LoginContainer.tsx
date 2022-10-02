import React from "react";
import Login from "./Login";
import {connect} from 'react-redux';
import {login} from "../../redux/authReducer";
import { AppStateType } from "../../redux/reduxStore";

export type MapStatePropsTypeLogin = {
    isAuth:boolean,
    captcha: string | null
}
export type MapDispatchPropsTypeLogin = {
    login: (formData: any) => void
}
type Props = MapStatePropsTypeLogin & MapDispatchPropsTypeLogin;

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
let mapStateToProps = (state: AppStateType):MapStatePropsTypeLogin=>({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
   });

export default connect<MapStatePropsTypeLogin, MapDispatchPropsTypeLogin, {}, AppStateType>(mapStateToProps, {login})(LoginContainer);

