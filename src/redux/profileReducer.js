import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_USER_PHOTO = "SAVE_USER_PHOTO";
const SAVE_USER_PROFILE = "SAVE_USER_PROFILE";
let initialState = {
    posts: [
        {id: 1, post: "Wassup!", likesCount:2}, 
        {id: 2, post:"React in progress", likesCount:17} 
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) =>{
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
                ...action.photo               
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
export const addPostActionCreator =(postText)=>({ type: ADD_POST, postText });
export const deletePost =(postId)=>({ type: DELETE_POST, postId });
export const setStatusAC =(status)=>({ type: SET_STATUS, status });
export const setUserProfile =(profile)=>({ type: SET_USER_PROFILE, profile });


export const setProfile = (userId) => async(dispatch) => {    
    let result = await profileAPI.setProfile(userId); 
    dispatch(setUserProfile(result.data));
}
export const setStatus = (userId) => async(dispatch) => {    
    let result = await profileAPI.getStatus(userId);
     dispatch(setStatusAC(result.data));
}
export const updateStatus = (status) => async (dispatch) => {
    let result = await profileAPI.updateStatus(status);      
        if(result.data.resultCode === 0) 
        dispatch(setStatusAC(status));
}
export const saveProfile = (formData) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let result = await profileAPI.saveProfile(formData);      
        if(result.data.resultCode === 0) 
        dispatch(setProfile(userId));
}
export const setProfileData =(formData)=>({ type: SAVE_USER_PROFILE, formData});

export const setPhoto =(photo)=>({ type: SAVE_USER_PHOTO, photo});
export const savePhoto = (photo) => async (dispatch) => {
    let result = await profileAPI.savePhoto(photo);
    if(result.data.resultCode === 0){
        dispatch(setPhoto(photo));
        
    }

} 

export default profileReducer;