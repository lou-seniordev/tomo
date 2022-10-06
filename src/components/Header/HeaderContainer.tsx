import React from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {getAuthUser, logout} from '../../redux/authReducer';
import { AppStateType } from '../../redux/reduxStore';



class HeaderContainer extends React.Component<Props>
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
type Props = MapStateToPropsType & MapDispatchToPropsType;
type MapStateToPropsType = {
    isAuth: boolean,
    login: string | null
}
type MapDispatchToPropsType = {
    getAuthUser: ()=>void,
    logout: ()=>void
}
const mapStateToProps = (state:AppStateType):MapStateToPropsType =>({ 
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, { getAuthUser, logout})(HeaderContainer);
