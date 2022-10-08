import { instance, ResultCode, ResultCodeForCaptcha, ResponseType } from './api';


export type MeResponseDataType = {
    id: number, 
    email: string, 
    login: string 
}
export type LoginResponseDataType = {
   userId: number 
}
//ResultCode | ResultCodeForCaptcha
export const authAPI = {
    authMe() {
        return instance.get<ResponseType<MeResponseDataType>>(`auth/me`).then(result => result.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<ResponseType<LoginResponseDataType, 
        ResultCode | ResultCodeForCaptcha>>(`auth/login`, 
        { email, password, rememberMe, captcha }).then(result => result.data);
    },
    logout() {
        return instance.delete(`auth/login`).then(result => result.data);
    }
};
