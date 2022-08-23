import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE="SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT="SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IN_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users:[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []

};

const usersReducer = (state = initialState, action) =>{
    switch(action.type){
        case FOLLOW:{
            return{
                ...state,
                users: state.users.map(u=>{
                    if(u.id === action.userId){

                        return{...u, followed: true}
                    }
                    return u;
                })              
            }
        }
        case UNFOLLOW:{
            return{
                ...state,
                users: state.users.map(u=>{
                    if(u.id === action.userId){
                        return{...u, followed: false}
                    }
                    return u;
                })              
            }
        }
        case SET_USERS:{
            return{ ...state, users: action.users}
        }
        case SET_CURRENT_PAGE:{
            return{ ...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT:{
            return{ ...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING:{
            return{ ...state, isFetching: action.isFetching}
        }
        case TOGGLE_IN_FOLLOWING_PROGRESS:{
            return {...state, followingInProgress: action.isFetching ? 
                [...state.followingInProgress, action.userId] :
                state.followingInProgress.filter(id=>id!=action.userId)}
        }
        default: return state;
    }    
    
}
export const followSuccess =(userId)=>({ type: FOLLOW, userId });
export const unfollowSuccess =(userId)=>({ type: UNFOLLOW, userId });
export const setUsers =(users)=>({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) =>({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) =>({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const setIsFetching = (isFetching) =>({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleFollowingProgress = (followingProgress, userId)=>({type:TOGGLE_IN_FOLLOWING_PROGRESS, isFetching: followingProgress, userId});
//!!!!!!1
export const requestUsers =(currentPage,pageSize)=> (dispatch) => {
    dispatch(setIsFetching(true));        
    usersAPI.getUsers(currentPage, pageSize).then(result => {
        dispatch(setUsers(result.items));
        dispatch(setIsFetching(false));
        dispatch(setTotalUsersCount(result.totalCount));
        });
}


export const follow =(userId) => (dispatch) => {
        dispatch(toggleFollowingProgress(true,userId));
        usersAPI.follow(userId).then(result => {
            if(result.resultCode === 0)
            {
                dispatch(followSuccess(userId));
                dispatch(toggleFollowingProgress(false,userId));
            }
        });
}

export const unfollow =(userId)=>(dispatch) => {
        dispatch(toggleFollowingProgress(true,userId));
        usersAPI.unFollow(userId).then(result => {
            if(result.resultCode === 0)
            {
                dispatch(unfollowSuccess(userId));
                dispatch(toggleFollowingProgress(false,userId));
            }
        });
}

export default usersReducer;