import { stopSubmit } from "redux-form";
import { getAuthUser } from "./authReducer";

const SET_INITIALIZED = "SET_INITIALIZED";


let initialState = {
   initialized: false
};

const appReducer = (state = initialState, action) =>{
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
export const initializeSuccess =()=>({ type: SET_INITIALIZED});
export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUser());
    promise.then(()=>{
    dispatch(initializeSuccess());
    });
}; 

export default appReducer;