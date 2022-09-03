import { stopSubmit } from "redux-form";
import { authAPI, profileAPI } from "../api/api";

const SAVE_USER_PHOTO = "SAVE_USER_PHOTO";

let initialState = {

};

const settingsReducer = (state = initialState, action) =>{
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
export const setPhoto =(photo)=>({ type: SAVE_USER_PHOTO, photo});
export const savePhoto = (photo) => async (dispatch) => {
    let result = await profileAPI.savePhoto(photo);
    if(result.data.resultCode === 0){
        dispatch(setPhoto(photo));
        
    }

} 

export default settingsReducer;