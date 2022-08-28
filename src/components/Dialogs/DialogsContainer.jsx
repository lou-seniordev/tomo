import React from 'react';
import { addMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {compose} from "redux";
import { reset } from 'redux-form';
let mapStateToProps = (state)=>{

    return ({
        dialogPage: state.dialogPage
    });
}
let mapDispatchToProps = (dispatch)=>{
    return ({
        messageSend: (newMessage)=>{ 
            dispatch(addMessageActionCreator(newMessage)); 
            dispatch(reset('dialog'));
        }
    });
}
export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs);