import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY" : "95cff933-c96b-4f06-b320-8dd8ec13df02"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1,pageSize = 1){
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    .then(response => response.data);
    },
    follow(userId: number){
        return instance.post(`follow/${userId}`).then(response => response.data);
    },
    unFollow(userId: number){
        return instance.delete(`follow/${userId}`).then(response => response.data);
    },
    setProfile(userId: number){
        console.warn("Please use profileAPI instead.");
        profileAPI.setProfile(userId);
    }
}
export const profileAPI = {   
    setProfile(userId: number){
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId: number){
        return instance.get(`profile/status/${userId}`);
    },
    updateStatus(status: string){        
        return instance.put(`profile/status`, {status});
    },
    savePhoto(photo: File){
        let formData = new FormData();
        formData.append("image",photo)
        return instance.put(`profile/photo`, formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
        }})
    },
    saveProfile(formData: any){        
        return instance.put(`profile`,formData);
    }
}

type MeResponseType = {
    data: { id: number, email: string, login: string },
    resultCode: number,
    messages: Array<string>
}

export const authAPI = {
    authMe(){
        return instance.get<MeResponseType>(`auth/me`);
    },
    login(email: string, password: string, rememberMe = false, captcha: null|string = null){
        return instance.post(`auth/login`, {email, password, rememberMe, captcha});
    },
    logout(){
        return instance.delete(`auth/login`);
    }

}
export const securityAPI = {
    getCaptchaUrl(){
        return instance.get(`security/get-captcha-url`);
    }

}
/**
 * 
 */