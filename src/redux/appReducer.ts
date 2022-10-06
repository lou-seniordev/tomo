import { getAuthUser } from "./authReducer";
import { ThunkAction } from "redux-thunk";
import { AppStateType, BaseThunkType, InferActionsType } from "./reduxStore";


let initialState = {
   initialized: false
};
const appReducer = (state = initialState, action:ActionTypes):initialStateType =>{
    switch(action.type){
        case 'APP/SET_INITIALIZED':{
            return{
                ...state,
                initialized: true           
            }
        }         
        default: return state;
    }       
}

export const actions = {
   initializeSuccess:()=>({ type: 'APP/SET_INITIALIZED'})
}

export const initializeApp = ():ThunkType => async (dispatch) => {
    let promise = dispatch(getAuthUser());
    promise.then(()=>{
    dispatch(actions.initializeSuccess());
    });
}; 

export type initialStateType = typeof initialState;
type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export default appReducer;