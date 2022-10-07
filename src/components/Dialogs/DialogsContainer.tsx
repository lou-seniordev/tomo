import React from 'react';
import { actions } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {compose, Dispatch} from "redux";
import { reset } from 'redux-form';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
    dialogPage: AppStateType["dialogPage"]
}
export type MapDispatchDialogPropsType = {
    messageSend: (newMessage: string) => void
}

let mapStateToProps = (state: AppStateType):MapStatePropsType=>{

    return ({
        dialogPage: state.dialogPage
    });
}
let mapDispatchToProps = (dispatch: Dispatch):MapDispatchDialogPropsType=>{
    return ({
        messageSend: (newMessage: string)=>{ 
            dispatch(actions.addMessage(newMessage)); 
            dispatch(reset('dialog'));
        }
    });
}
export default compose(
    connect<MapStatePropsType, MapDispatchDialogPropsType, {}, AppStateType>(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs);