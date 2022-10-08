import { UserType } from '../types/types';
import { instance, ResponseType } from './api';

export type GetUsersResponseType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 1) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`).then(response => response.data);
    },
    unFollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<ResponseType>;
    }
};
