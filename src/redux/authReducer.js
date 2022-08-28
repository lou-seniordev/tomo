import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";


let initialState = {
   id: null,
   email: null,
   login: null,
   isFetching: false,
   isAuth: false
};

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_USER_DATA:{
            return{
                ...state,
                ...action.payload                
            }
        }
        
        
        default: return state;
    }    
    
}
export const setUserData =(payload)=>({ type: SET_USER_DATA, payload});
export const getAuthUser = () => async (dispatch) => {
    let result = await authAPI.authMe();
    if(result.data.resultCode === 0){
        dispatch(setUserData({...result.data.data, isAuth:true}));
    }

} 

export const login = (formData) => async(dispatch) => 
{
    let result = await authAPI.login(formData.login,formData.password,formData.rememberMe);
    if(result.data.resultCode === 0){       
        dispatch(getAuthUser());
    }else {
        let message = result.data.messages > 0 ? result.data.messages[0] : "Incorrect email or password";
        dispatch(stopSubmit("login",{_error:message}));
    }
}

export const logout = () => async(dispatch) => {
let result = await authAPI.logout();
    if(result.data.resultCode === 0){        
        dispatch(setUserData({
            id:null,
            email: null,
            login: null,
            isAuth: false
        }));
    }
}
export default authReducer;