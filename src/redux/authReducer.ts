
import { ThunkAction } from "redux-thunk";
import { authAPI, ResultCode, ResultCodeForCaptcha, securityAPI } from "../api/api";
import { setProfile } from "./profileReducer";
import { AppStateType, InferActionsType } from "./reduxStore";
const stopSubmit = require("redux-form");

let initialState = {
   id: null as number | null,
   email: null as string | null,
   login: null as string | null,
   isFetching: false,
   isAuth: false,
   captcha: null as string | null
};
export type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action:ActionTypes):InitialStateType =>{
    switch(action.type){
        case 'SET_USER_DATA':
        case 'SET_CAPTCHA':{
            return{
                ...state,
                ...action.payload            
            }
        }       
        default: return state;
    }     
}
type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
type payloadType = {
    id: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

export const actions = {
    setUserData: (payload:payloadType)=>({ type: 'SET_USER_DATA', payload}),
    setCaptcha: (captcha: string)=>({ type: 'SET_CAPTCHA', payload:{captcha}}),
}


export const getAuthUser = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.authMe();
    if(meData.resultCode === ResultCode.Success){
        dispatch(actions.setUserData({...meData.data, isAuth:true}));
    }

} 
type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: any
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
export default authReducer;
