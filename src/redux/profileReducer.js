import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";

let initialState = {
    posts: [
        {id: 1, post: "Wassup!", likesCount:2}, 
        {id: 2, post:"React in progress", likesCount:17} 
    ],
    newPostText: "",
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
        default: return state;
    }    
    
}
export const addPostActionCreator =(postText)=>({ type: ADD_POST, postText });
export const deletePost =(postId)=>({ type: DELETE_POST, postId });

export const setUserProfile =(profile)=>({ type: SET_USER_PROFILE, profile });
export const setStatusAC =(status)=>({ type: SET_STATUS, status });

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


export default profileReducer;