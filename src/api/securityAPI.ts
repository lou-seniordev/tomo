import { instance, GetCaptchaResponseType } from './api';


export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaResponseType>(`security/get-captcha-url`).then(result => result.data);
    }
};
