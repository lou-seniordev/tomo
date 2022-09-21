
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, profileAPI } from "../api/api";
import { AppStateType } from "./reduxStore";

const SAVE_USER_PHOTO = "SAVE_USER_PHOTO";

let initialState = {

};
type InitialStateType = typeof initialState;
type SetPhotoType = {
    type: typeof SAVE_USER_PHOTO,
    photo: File
}
type ActionTypes = SetPhotoType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
const settingsReducer = (state = initialState, action:ActionTypes):InitialStateType =>{
    switch(action.type){
        case SAVE_USER_PHOTO:{
            return{
                ...state,
                ...action.photo               
            }
        }   
        default: return state;
    }        
}
export const setPhoto =(photo:File):SetPhotoType=>({ type: SAVE_USER_PHOTO, photo});
export const savePhoto = (photo:File):ThunkType => async (dispatch) => {
    let result = await profileAPI.savePhoto(photo);
    
    if(result.data.resultCode === 0){
        dispatch(setPhoto(photo));       
    }
} 
export default settingsReducer;