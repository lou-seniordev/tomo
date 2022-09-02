import { stopSubmit } from "redux-form";
import { authAPI, profileAPI } from "../api/api";

const SAVE_USER_PHOTO = "auth/SAVE_USER_PHOTO";


let initialState = {
   email: null,
   login: null
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
// export const logout = () => async(dispatch) => {
// let result = await authAPI.logout();
//     if(result.data.resultCode === 0){        
//         dispatch(setUserData({
//             id:null,
//             email: null,
//             login: null,
//             isAuth: false
//         }));
//     }
// }
export default settingsReducer;