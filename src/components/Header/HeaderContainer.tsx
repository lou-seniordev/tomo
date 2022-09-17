import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getAuthUser, logout} from '../../redux/authReducer';

class HeaderContainer extends React.Component<{getAuthUser:any,logout:any}>
{
    componentDidMount(){
        this.props.getAuthUser();      
    }
    onLogoutClick = ()=>{

        this.props.logout();
        this.setState({
            isAuth: false,
            login: ""
        });
        
        // redirect to /users
    }
    render(){
        return <Header {...this.props} logout={this.onLogoutClick}/>;
    }
}

const mapStateToProps = (state:any) =>({
    
    isAuth: state.auth.isAuth,
    login: state.auth.login

});

export default connect(mapStateToProps, { getAuthUser, logout})(HeaderContainer);
