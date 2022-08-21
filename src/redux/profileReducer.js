import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";


let initialState = {
    posts: [
        {id: 1, post: "Wassup!", likesCount:2}, 
        {id:2,  post:"There's first usage of props", likesCount:17} 
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
        default: return state;
    }    
    
}
export const addPostActionCreator =(postText)=>({ type: ADD_POST, postText });

export const setUserProfile =(profile)=>({ type: SET_USER_PROFILE, profile });
export const setStatusAC =(status)=>({ type: SET_STATUS, status });

export const setProfile = (userId) => (dispatch) => {    
    profileAPI.setProfile(userId).then(result => { dispatch(setUserProfile(result.data))});
}
export const setStatus = (userId) => (dispatch) => {
    
    profileAPI.getStatus(userId).then(result => dispatch(setStatusAC(result.data)));
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status).then(result => {
        
        if(result.data.resultCode === 0) 
        dispatch(setStatusAC(status));
    });
}


export default profileReducer;