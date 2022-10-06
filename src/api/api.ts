import { PhotosType } from './../types/types';
import axios from 'axios';
import { UserType } from '../types/types';
let testAccountKey:string = "d468750f-9375-4a29-a11c-b92c8a23520a";
// "95cff933-c96b-4f06-b320-8dd8ec13df02"
export enum ResultCode{
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha{
    CaptchaRequired = 10
}
export type ResponseType<D={}, RC=ResultCode> = {
    data: D,
    messages: Array<string>,
    resultCode:RC
}



export type GetCaptchaResponseType = {
    url: string
}
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY" : testAccountKey
    }
});

