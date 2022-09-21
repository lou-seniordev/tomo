import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostsType, ProfileType } from "../types/types";
import { AppStateType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_USER_PHOTO = "SAVE_USER_PHOTO";
const SAVE_USER_PROFILE = "SAVE_USER_PROFILE";

type addPostActionCreatorType = {
    type: typeof ADD_POST,
    postText: string
}
type deletePostType = {
    type: typeof DELETE_POST,
    postId: number
}
type setStatusACType = {
    type: typeof SET_STATUS,
    status: string
}
type setUserProfileType = {
    type: typeof SET_USER_PROFILE,
    profile: ProfileType
}
type setPhotoType = {
    type: typeof SAVE_USER_PHOTO,
    photos: PhotosType
}
type SetProfileDataType = {
    type: typeof SAVE_USER_PROFILE
    formData: any
}
type ActionTypes = addPostActionCreatorType | deletePostType | setStatusACType | setUserProfileType |  setPhotoType | SetProfileDataType;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

let initialState = {
    posts: [
        {id: 1, post: "Wassup!", likesCount:2}, 
        {id: 2, post:"React in progress", likesCount:17} 
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}
export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action :ActionTypes):InitialStateType =>{
    switch(action.type){
        case ADD_POST:{
            return {
                ...state,
                posts: [...state.posts, 
                {
                    id: 5, 
                    post: action.postText,
                    likesCount: 0
                }],
                newPostText: ""
            };
        }
        case SET_USER_PROFILE:
        {
            return{
                ...state, profile: action.profile
            }
        }
        case SET_STATUS:
            {
                return{
                    ...state, status: action.status
                }
            }
        case DELETE_POST:
            {
                return{
                    ...state, posts: state.posts.filter(p=>p.id!=action.postId)
                }
            }
        case SAVE_USER_PHOTO:{
            
            return{
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType             
            }
        } 
        case SAVE_USER_PROFILE:{
            return{
                ...state,
                profile:{...state.profile, ...action.formData  }            
            }
        }  
        default: return state;
    }    
    
}


export const addPostActionCreator =(postText:string):addPostActionCreatorType=>({ type: ADD_POST, postText });

export const deletePost =(postId:number):deletePostType=>({ type: DELETE_POST, postId });
export const setStatusAC =(status:string):setStatusACType=>({ type: SET_STATUS, status });
export const setUserProfile =(profile:ProfileType):setUserProfileType=>({ type: SET_USER_PROFILE, profile });


export const setProfile = (userId:number):ThunkType => async(dispatch) => {    
    let result = await profileAPI.setProfile(userId); 
    dispatch(setUserProfile(result.data));
}
export const setStatus = (userId:number):ThunkType => async(dispatch) => {    
    let result = await profileAPI.getStatus(userId);
     dispatch(setStatusAC(result.data));
}
export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let result = await profileAPI.updateStatus(status);      
        if(result.data.resultCode === 0) 
        dispatch(setStatusAC(status));
}
export const saveProfile = (formData:any) => async (dispatch:any, getState:any) => { // thunk needs to be typecast
    const userId = getState().auth.id;
    let result = await profileAPI.saveProfile(formData);      
        if(result.data.resultCode === 0) 
        {
        dispatch(setProfile(userId));
        }else{
            let message = result.data.messages[0]; //result.data.messages > 0 ? result.data.messages[0] : ""
            dispatch(stopSubmit("profileEdit",{_error:message}));
            return message;
        }
}
export const setProfileData =(formData:any):SetProfileDataType=>({ type: SAVE_USER_PROFILE, formData});

export const setPhoto =(photos:PhotosType):setPhotoType=>({ type: SAVE_USER_PHOTO, photos});
export const savePhoto = (photo:File):ThunkType => async (dispatch) => {
    debugger
    let result = await profileAPI.savePhoto(photo);
    if(result.data.resultCode === 0){
        dispatch(setPhoto(result.data.data.photos));       
    }
    

} 

export default profileReducer;