import React from 'react';
import { addMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import {connect} from "react-redux";
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import {compose} from "redux";
let mapStateToProps = (state)=>{

    return ({
        dialogPage: state.dialogPage
    });
}
let mapDispatchToProps = (dispatch)=>{
    return ({
        messageSend: (newMessage)=>{ dispatch(addMessageActionCreator(newMessage)); }
    });
}

//const DialogsContainer = connect(mapStateToProps,mapDispatchToProps)(withAuthRedirect(Dialogs));

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    withAuthRedirect
)(Dialogs);