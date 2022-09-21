import { stopSubmit } from "redux-form";
import { getAuthUser } from "./authReducer";
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./reduxStore";

const SET_INITIALIZED:string = "SET_INITIALIZED";

export type initialStateType = {
    initialized: boolean
}
let initialState: initialStateType = {
   initialized: false
};
type InitializeSuccessType = {
    type: typeof SET_INITIALIZED
}
const appReducer = (state = initialState, action:InitializeSuccessType):initialStateType =>{
    switch(action.type){
        case SET_INITIALIZED:{
            return{
                ...state,
                initialized: true           
            }
        } 
        default: return state;
    }    
    
}
type ActionTypes = InitializeSuccessType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
export const initializeSuccess =():InitializeSuccessType=>({ type: SET_INITIALIZED});
export const initializeApp = ():ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUser());
    promise.then(()=>{
    dispatch(initializeSuccess());
    });
}; 

export default appReducer;