import { stopSubmit } from "redux-form";
import { getAuthUser } from "./authReducer";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsType } from "./reduxStore";

export type initialStateType = typeof initialState;
let initialState = {
   initialized: false
};
const appReducer = (state = initialState, action:ActionTypes):initialStateType =>{
    switch(action.type){
        case 'SET_INITIALIZED':{
            return{
                ...state,
                initialized: true           
            }
        } 
        
        default: return state;
    }    
    
}
type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export const actions = {
   initializeSuccess:()=>({ type: 'SET_INITIALIZED'})
}


export const initializeApp = ():ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUser());
    promise.then(()=>{
    dispatch(actions.initializeSuccess());
    });
}; 

export default appReducer;