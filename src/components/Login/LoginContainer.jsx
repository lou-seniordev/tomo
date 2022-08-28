import React from "react";
import Login from "./Login";
import {connect} from 'react-redux';
import {login} from "../../redux/authReducer";

class LoginContainer extends React.Component{
    render(){
        return <Login {...this.props} login={this.props.login}/>
    }
}
let mapStateToProps = (state)=>({
    isAuth: state.auth.isAuth
   });

export default connect(mapStateToProps, {login})(LoginContainer);

