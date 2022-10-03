import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { PhotosType, PostsType, ProfileType } from "../types/types";
import { AppStateType, InferActionsType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";

type ActionTypes = InferActionsType<typeof actions>;
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
        case 'ADD_POST':{
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
        case 'SET_USER_PROFILE':
        {
            return{
                ...state, profile: action.profile
            }
        }
        case 'SET_STATUS':
            {
                return{
                    ...state, status: action.status
                }
            }
        case 'DELETE_POST':
            {
                return{
                    ...state, posts: state.posts.filter(p=>p.id!=action.postId)
                }
            }
        case 'SAVE_USER_PHOTO':{
            
            return{
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType             
            }
        } 
        case 'SAVE_USER_PROFILE':{
            return{
                ...state,
                profile:{...state.profile, ...action.formData  }            
            }
        }  
        default: return state;
    }    
    
}

export const actions = {
    addPostActionCreator: (postText:string)=>({ type: 'ADD_POST', postText }as const),
    deletePost: (postId:number)=>({ type: 'DELETE_POST', postId }as const),
    setStatusAC: (status:string)=>({ type: 'SET_STATUS', status }as const),
    setUserProfile: (profile:ProfileType)=>({ type: 'SET_USER_PROFILE', profile }as const),
    setProfileData: (formData:any)=>({ type: 'SAVE_USER_PROFILE', formData}as const),
    setPhoto: (photos:PhotosType)=>({ type: 'SAVE_USER_PHOTO', photos}as const)
}



export const setProfile = (userId:number):ThunkType => async(dispatch) => {    
    let result = await profileAPI.setProfile(userId); 
    dispatch(actions.setUserProfile(result.data));
}
export const setStatus = (userId:number):ThunkType => async(dispatch) => {    
    let result = await profileAPI.getStatus(userId);
     dispatch(actions.setStatusAC(result.data));
}
export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let result = await profileAPI.updateStatus(status);      
        if(result.data.resultCode === 0) 
        dispatch(actions.setStatusAC(status));
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

export const savePhoto = (photo:File):ThunkType => async (dispatch) => {
    debugger
    let result = await profileAPI.savePhoto(photo);
    if(result.data.resultCode === 0){
        dispatch(actions.setPhoto(result.data.data.photos));       
    }
    

} 

export default profileReducer;