import { ThunkAction } from "redux-thunk";
import { ResultCode, ResultCodeForCaptcha } from "../api/api";
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";
import { AppStateType, BaseThunkType, InferActionsType } from "./reduxStore";
import { FormAction } from "redux-form";
const stopSubmit = require("redux-form");

let initialState = {
   id: null as number | null,
   email: null as string | null,
   login: null as string | null,
   isFetching: false,
   isAuth: false,
   captcha: null as string | null
};


const authReducer = (state = initialState, action:ActionTypes):InitialStateType =>{
    switch(action.type){
        case 'SN/AUTH/SET_USER_DATA':
        case 'SN/AUTH/SET_CAPTCHA':{
            return{
                ...state,
                ...action.payload            
            }
        }       
        default: return state;
    }     
}

export const actions = {
    setUserData: (payload:payloadType)=>({ type: 'SN/AUTH/SET_USER_DATA', payload}),
    setCaptcha: (captcha: string)=>({ type: 'SN/AUTH/SET_CAPTCHA', payload:{captcha}}),
}

export const getAuthUser = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.authMe();
    if(meData.resultCode === ResultCode.Success){
        dispatch(actions.setUserData({...meData.data, isAuth:true}));
    }

} 

export const login = (formData:FormDataType):ThunkType => async(dispatch) => 
{
    let data = await authAPI.login(formData.email,formData.password,formData.rememberMe, formData.captcha);
    if(data.resultCode === ResultCode.Success){       
        dispatch(getAuthUser());
    }else {
        let message = data.messages.length > 0 ? data.messages[0] : "Incorrect email or password";
        if(data.resultCode === ResultCodeForCaptcha.CaptchaRequired)
        {
            dispatch(getCaptcha());
            message = data.messages[0];
        }         
        dispatch(stopSubmit("login",{_error:message}));
    }
}
export const getCaptcha = ():ThunkType => async (dispatch) => {
    let data = await securityAPI.getCaptchaUrl();
    dispatch(actions.setCaptcha(data.url));
} 

export const logout = ():ThunkType => async(dispatch) => {
let data = await authAPI.logout();
    if(data.resultCode === ResultCode.Success){                
        dispatch(actions.setUserData({
            id: null,
            email: null,
            login: null,
            isAuth: false
        }));
    }
}

export type InitialStateType = typeof initialState;
type ActionTypes = InferActionsType<typeof actions>;
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
type ThunkType = BaseThunkType<ActionTypes | FormAction>;

type payloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}
type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: any
}

export default authReducer;
