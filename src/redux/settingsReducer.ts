import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/authAPI";
import { profileAPI } from "../api/profileAPI";
import { AppStateType, BaseThunkType, InferActionsType } from "./reduxStore";

let initialState = {};

const settingsReducer = (state = initialState, action:ActionTypes):InitialStateType =>{
    switch(action.type){
        case 'SN/SETTINGS/SAVE_USER_PHOTO':{
            return{
                ...state,
                ...action.photo               
            }
        }   
        default: return state;
    }        
}
export const actions = {
    setPhoto: (photo:File)=>({ type: 'SN/SETTINGS/SAVE_USER_PHOTO', photo} as const)
}

export const savePhoto = (photo:File):ThunkType => async (dispatch) => {
    let result = await profileAPI.savePhoto(photo);
    
    if(result.resultCode === 0){
        dispatch(actions.setPhoto(photo));       
    }
} 

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsType< typeof actions>;
type ThunkType = BaseThunkType<ActionTypes>;
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

export default settingsReducer;