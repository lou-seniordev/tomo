
import { authAPI, securityAPI } from "../api/api";
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
let GetAuthActionType = {
    type: typeof SET_USER_DATA,
    payload: {}
}
const authReducer = (state = initialState, action: typeof GetAuthActionType) =>{
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
export const setUserData =(payload:any)=>({ type: SET_USER_DATA, payload});
export const getAuthUser = () => async (dispatch:any) => {
    let result = await authAPI.authMe();
    if(result.data.resultCode === 0){
        dispatch(setUserData({...result.data.data, isAuth:true}));
    }

} 
let FormDataType = {
    login: "",
    password: "",
    rememberMe: false,
    captcha: null as any
}
export const login = (formData: typeof FormDataType) => async(dispatch:any) => 
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
export const setCaptcha =(captcha: string)=>({ type: SET_CAPTCHA, payload:{captcha}});

export const logout = () => async(dispatch:any) => {
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