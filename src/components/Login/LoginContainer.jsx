import React from "react";
import Login from "./Login";
import {connect} from 'react-redux';
import {login} from "../../redux/authReducer";

class LoginContainer extends React.Component{
    componentDidUpdate(prevProps, prevState){
        if(prevProps.captcha != this.props.captcha)
        {
            this.render();
        }
    }
    render(){
        return <Login {...this.props} captcha={this.props.captcha} login={this.props.login}/>
    }
}
let mapStateToProps = (state)=>({
    isAuth: state.auth.isAuth,
    captcha: state.auth.captcha
   });

export default connect(mapStateToProps, {login})(LoginContainer);

