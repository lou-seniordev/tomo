import { PhotosType, ProfileType } from './../types/types';
import axios from 'axios';
import { UserType } from '../types/types';

export enum ResultCode{
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha{
    CaptchaRequired = 10
}
type BasicResponseType = {
    data: { },
    resultCode: ResultCode ,
    messages: Array<string>
}
type FollowResponseType = BasicResponseType;
type UnFollowResponseType = BasicResponseType;
type LogoutResponseType = BasicResponseType;
type UpdateStatusResponseType = BasicResponseType;
type MeResponseType = {
    data: { id: number, email: string, login: string },
    resultCode: ResultCode,
    messages: Array<string>
}
type LoginResponseType = {
    data: { userId: number },
    resultCode: ResultCode | ResultCodeForCaptcha,
    messages: Array<string>
}
type GetCaptchaResponseType = {
    url: string
}
type GetUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}
type SavePhotoResponseType = {
    data: {photos: PhotosType},
    resultCode: ResultCode,
    messages: Array<string>
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY" : "95cff933-c96b-4f06-b320-8dd8ec13df02"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1,pageSize = 1){
    return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
    },
    follow(userId: number){
        return instance.post<FollowResponseType>(`follow/${userId}`).then(response => response.data);
    },
    unFollow(userId: number){
        return instance.delete<UnFollowResponseType>(`follow/${userId}`).then(response => response.data);
    },
    setProfile(userId: number){
        console.warn("Please use profileAPI instead.");
        profileAPI.setProfile(userId);
    }
}
export const profileAPI = {   
    setProfile(userId: number){
        return instance.get<ProfileType>(`profile/${userId}`);
    },
    getStatus(userId: number){
        return instance.get<string>(`profile/status/${userId}`); // Response status:string
    },
    updateStatus(status: string){        
        return instance.put<UpdateStatusResponseType>(`profile/status`, {status});
    },
    savePhoto(photo: File){
        let formData = new FormData();
        formData.append("image",photo)
        return instance.put<SavePhotoResponseType>(`profile/photo`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
        }})
    },
    saveProfile(formData: any){        
        return instance.put<BasicResponseType>(`profile`,formData);
    }
}
export const authAPI = {
    authMe(){
        return instance.get<MeResponseType>(`auth/me`).then(result => result.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: null|string = null){
        return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha}).then(result=>result.data);
    },
    logout(){
        return instance.delete<LogoutResponseType>(`auth/login`).then(result => result.data);
    }

}
export const securityAPI = {
    getCaptchaUrl(){
        return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`).then(result => result.data);
    }

}
/**
 * 
 */