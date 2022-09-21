import React from 'react';
import { addMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {compose, Dispatch} from "redux";
import { reset } from 'redux-form';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    dialogPage: AppStateType["dialogPage"]
}
type MapDispatchPropsType = {
    messageSend: (newMessage: string) => void
}

let mapStateToProps = (state: AppStateType):MapStatePropsType=>{

    return ({
        dialogPage: state.dialogPage
    });
}
let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType=>{
    return ({
        messageSend: (newMessage: string)=>{ 
            dispatch(addMessageActionCreator(newMessage)); 
            dispatch(reset('dialog'));
        }
    });
}
export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs);