import React from "react";
import { Navigate } from "react-router-dom";
import {connect} from "react-redux";
import { AppStateType } from "../../redux/reduxStore";
let mapStateToPropsForRedirect = (state: AppStateType)=>({
        isAuth: state.auth.isAuth
      });
type Props = {
    isAuth: boolean
}
export const withAuthRedirect = (Component: any)=>{
    
    class RedirectComponent extends React.Component<Props>{
        render(){
            if(!this.props.isAuth) return <Navigate to={"/login"}/>;
            return <Component {...this.props} />
        }
    }
    
    let ConnectedRedirectComponent = connect<Props, {}, {}, AppStateType>(mapStateToPropsForRedirect,{})(RedirectComponent);
    return ConnectedRedirectComponent;
}