
import { authAPI, securityAPI } from "../api/api";
import { setProfile } from "./profileReducer";
const stopSubmit = require("redux-form");
const SET_USER_DATA:string = "auth/SET_USER_DATA";
const SET_CAPTCHA:string = "auth/SET_CAPTCHA";

let initialState = {
   id: null as number | null,
   email: null as string | null,
   login: null as string | null,
   isFetching: false,
   isAuth: false,
   captcha: null as string | null
};
export type initialStateType = typeof initialState;
type setUserDataType = {
    type: typeof SET_USER_DATA,
    payload: {}
}
const authReducer = (state = initialState, action:setUserDataType):initialStateType =>{
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
type payloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
export const setUserData =(payload:payloadType):setUserDataType=>({ type: SET_USER_DATA, payload});
export const getAuthUser = () => async (dispatch:any) => {
    let result = await authAPI.authMe();
    if(result.data.resultCode === 0){
        dispatch(setUserData({...result.data.data, isAuth:true}));
    }

} 
type FormDataType = {
    login: string,
    password: string,
    rememberMe: boolean,
    captcha: any
}
export const login = (formData:FormDataType) => async(dispatch:any) => 
{
    let result = await authAPI.login(formData.login,formData.password,formData.rememberMe, formData.captcha);
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
export const getCaptcha = () => async (dispatch:any) => {
    let result = await securityAPI.getCaptchaUrl();
    dispatch(setCaptcha(result.data.url));
} 
type SettingCaptchaType = {
    type: typeof SET_CAPTCHA,
    payload: {captcha:string}
}
export const setCaptcha =(captcha: string):SettingCaptchaType=>({ type: SET_CAPTCHA, payload:{captcha}});

export const logout = () => async(dispatch:any) => {
let result = await authAPI.logout();
    if(result.data.resultCode === 0){                
        dispatch(setUserData({
            id: null,
            email: null,
            login: null,
            isAuth: false
        }));
    }
}
export default authReducer;
// bug with log out