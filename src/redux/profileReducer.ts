import { profileAPI } from "../api/profileAPI";
import { FormAction, stopSubmit } from "redux-form";
import { PhotosType, PostsType, ProfileType } from "../types/types";
import { AppStateType, BaseThunkType, InferActionsType } from "./reduxStore";
import { ThunkAction } from "redux-thunk";



let initialState = {
    posts: [
        {id: 1, post: "Wassup!", likesCount:2}, 
        {id: 2, post:"React in progress", likesCount:17} 
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ""
}

const profileReducer = (state = initialState, action :ActionTypes):InitialStateType =>{
    switch(action.type){
        case 'SN/PROFILE/ADD_POST':{
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
        case 'SN/PROFILE/SET_USER_PROFILE':
        {
            return{
                ...state, profile: action.profile
            }
        }
        case 'SN/PROFILE/SET_STATUS':
            {
                return{
                    ...state, status: action.status
                }
            }
        case 'SN/PROFILE/DELETE_POST':
            {
                return{
                    ...state, posts: state.posts.filter(p=>p.id!=action.postId)
                }
            }
        case 'SN/PROFILE/SAVE_USER_PHOTO':{
            
            return{
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType             
            }
        } 
        case 'SN/PROFILE/SAVE_USER_PROFILE':{
            return{
                ...state,
                profile:{...state.profile, ...action.formData  }            
            }
        }  
        default: return state;
    }       
}

export const actions = {
    addPostActionCreator: (postText:string)=>({ type: 'SN/PROFILE/ADD_POST', postText }as const),
    deletePost: (postId:number)=>({ type: 'SN/PROFILE/DELETE_POST', postId }as const),
    setStatusAC: (status:string)=>({ type: 'SN/PROFILE/SET_STATUS', status }as const),
    setUserProfile: (profile:ProfileType)=>({ type: 'SN/PROFILE/SET_USER_PROFILE', profile }as const),
    setProfileData: (formData:any)=>({ type: 'SN/PROFILE/SAVE_USER_PROFILE', formData}as const),
    setPhoto: (photos:PhotosType)=>({ type: 'SN/PROFILE/SAVE_USER_PHOTO', photos}as const)
}

export const setProfile = (userId:number):ThunkType => async(dispatch) => {    
    let result = await profileAPI.setProfile(userId); 
    dispatch(actions.setUserProfile(result));
}
export const setStatus = (userId:number):ThunkType => async(dispatch) => {    
    let result = await profileAPI.getStatus(userId);
     dispatch(actions.setStatusAC(result));
}
export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let result = await profileAPI.updateStatus(status);      
        if(result.resultCode === 0) 
        dispatch(actions.setStatusAC(status));
}
export const saveProfile = (formData: ProfileType): ThunkType => async (dispatch, getState) => { // thunk needs to be typecast
    const userId = getState().auth.id;
    const result = await profileAPI.saveProfile(formData);      
        if(result.resultCode === 0) 
        {
            if(userId != null)
                dispatch(setProfile(userId));
            else 
                throw new Error("UserId can't be null");
        }else{
            let message = result.messages[0]; //result.data.messages > 0 ? result.data.messages[0] : ""
            dispatch(stopSubmit("profileEdit",{_error:message}));
            return message;
        }
}

export const savePhoto = (photo:File):ThunkType => async (dispatch) => {
    let result = await profileAPI.savePhoto(photo);
    if(result.resultCode === 0){
        dispatch(actions.setPhoto(result.data.photos));       
    }
    

} 

type ActionTypes = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | FormAction, Promise<void | string>>; //, Promise<void>|Promise<string | null>
export type InitialStateType = typeof initialState;
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;
export default profileReducer;