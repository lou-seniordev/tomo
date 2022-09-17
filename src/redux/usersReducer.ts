
import { usersAPI } from "../api/api";
import { PhotosType, UserType } from "../types/types";
import { objectSelectionChanges } from "../utils/helper";


const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE="SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT="SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IN_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users:[] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id
};
type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: any):InitialStateType =>{
    switch(action.type){
        case FOLLOW:{
            return{
                ...state,
                users: objectSelectionChanges(state.users, action.userId, "id", {followed: true})       
            }
        }
        case UNFOLLOW:{
            return{
                ...state,
                users: objectSelectionChanges(state.users, action.userId, "id", {followed: false})              
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
                state.followingInProgress.filter((id:number)=>id!=action.userId)}
        }
        default: return state;
    }    
    
}
type FollowSuccessType = {
    type: typeof FOLLOW,
    userId: number
}
export const followSuccess =(userId:number):FollowSuccessType=>({ type: FOLLOW, userId });
type UnFollowSuccessType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowSuccess =(userId:number):UnFollowSuccessType=>({ type: UNFOLLOW, userId });
type SetUsersType = {
    type: typeof SET_USERS
    users: any
}
export const setUsers =(users:Array<UserType>):SetUsersType=>({ type: SET_USERS, users });
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage:number):SetCurrentPageType =>({type: SET_CURRENT_PAGE, currentPage});
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount:number):SetTotalUsersCountType =>({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
type SetIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setIsFetching = (isFetching:boolean):SetIsFetchingType =>({type: TOGGLE_IS_FETCHING, isFetching});
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IN_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId: number
}
export const toggleFollowingProgress = (followingProgress:boolean, userId:number):ToggleFollowingProgressType => 
    ({type:TOGGLE_IN_FOLLOWING_PROGRESS, isFetching: followingProgress, userId});
export const requestUsers =(currentPage:number,pageSize:number)=> async (dispatch:any) => {
    dispatch(setIsFetching(true));        
    let result = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(setUsers(result.items));
        dispatch(setIsFetching(false));
        dispatch(setTotalUsersCount(result.totalCount));
        dispatch(setCurrentPage(currentPage));
}

const followUnfollowFlow = async(dispatch:any, userId:number, actionMethod:any, actionCreator:any)=>{
    dispatch(toggleFollowingProgress(true,userId));
        let result = await actionMethod(userId);
        if(result.resultCode === 0)
        {
            dispatch(actionCreator(userId));
            dispatch(toggleFollowingProgress(false,userId));
        }
}
export const follow =(userId:number) => async (dispatch:any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI),followSuccess);
}

export const unfollow =(userId:number)=> async (dispatch:any) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI),unfollowSuccess);
}

export default usersReducer;