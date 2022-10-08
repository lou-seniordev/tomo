import { PhotosType, ProfileType } from './../types/types';
import { instance, ResponseType } from './api';

export type SavePhotoResponseType = {
    photos: PhotosType
}
export const profileAPI = {
    setProfile(userId: number) {
        return instance.get<ProfileType>(`profile/${userId}`).then(result => result.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/${userId}`).then(result => result.data); // Response status:string
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, { status }).then(result => result.data);
    },
    savePhoto(photo: File) {
        let formData = new FormData();
        formData.append("image", photo);
        return instance.put<ResponseType<SavePhotoResponseType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => result.data);
    },
    saveProfile(formData: ProfileType) {
        return instance.put<ResponseType>(`profile`, formData).then(result => result.data);
    }
};
