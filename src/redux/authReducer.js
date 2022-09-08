import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_CAPTCHA = "auth/SET_CAPTCHA";

let initialState = {
   id: null,
   email: null,
   login: null,
   isFetching: false,
   isAuth: false,
   captcha: null
};

const authReducer = (state = initialState, action) =>{
    switch(action.type){
        case SET_USER_DATA:
        case SET_CAPTCHA:{
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
    let result = await authAPI.login(formData.login,formData.password,formData.rememberMe,formData.captcha);
    if(result.data.resultCode === 0){       
        dispatch(getAuthUser());
    }else {
        let message = result.data.messages > 0 ? result.data.messages[0] : "Incorrect email or password";
        if(result.data.resultCode === 10)
        {
            dispatch(getCaptcha());
            message = result.data.messages[0];
        }         
        dispatch(stopSubmit("login",{_error:message}));
    }
}
export const getCaptcha = () => async (dispatch) => {
    let result = await securityAPI.getCaptchaUrl();
    dispatch(setCaptcha(result.data.url));
} 
export const setCaptcha =(captcha)=>({ type: SET_CAPTCHA, payload:{captcha}});

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