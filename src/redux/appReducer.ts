import { stopSubmit } from "redux-form";
import { getAuthUser } from "./authReducer";

const SET_INITIALIZED:string = "SET_INITIALIZED";

export type initialStateType = {
    initialized: boolean
}
let initialState: initialStateType = {
   initialized: false
};
type initializeSuccessType = {
    type: typeof SET_INITIALIZED
}
const appReducer = (state = initialState, action:initializeSuccessType):initialStateType =>{
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
export const initializeSuccess =():initializeSuccessType=>({ type: SET_INITIALIZED});
export const initializeApp = () => (dispatch:any) => {
    let promise = dispatch(getAuthUser());
    promise.then(()=>{
    dispatch(initializeSuccess());
    });
}; 

export default appReducer;