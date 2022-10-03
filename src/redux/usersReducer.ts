
import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/api";
import { PhotosType, UserType } from "../types/types";
import { objectSelectionChanges } from "../utils/helper";
import { AppStateType, InferActionsType } from "./reduxStore";

let initialState = {
    users:[] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of users id
};
type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionTypes):InitialStateType =>{
    switch(action.type){
        case 'FOLLOW':{
            return{
                ...state,
                users: objectSelectionChanges(state.users, action.userId, "id", {followed: true})       
            }
        }
        case 'UNFOLLOW':{
            return{
                ...state,
                users: objectSelectionChanges(state.users, action.userId, "id", {followed: false})              
            }
        }
        case 'SET_USERS':{
            return{ ...state, users: action.users}
        }
        case 'SET_CURRENT_PAGE':{
            return{ ...state, currentPage: action.currentPage}
        }
        case 'SET_TOTAL_USERS_COUNT':{
            return{ ...state, totalUsersCount: action.totalUsersCount}
        }
        case 'TOGGLE_IS_FETCHING':{
            return{ ...state, isFetching: action.isFetching}
        }
        case 'TOGGLE_IN_FOLLOWING_PROGRESS':{
            return {...state, followingInProgress: action.isFetching ? 
                [...state.followingInProgress, action.userId] :
                state.followingInProgress.filter((id:number)=>id!=action.userId)}
        }
        default: return state;
    }    
    
}

export const actions = {
    followSuccess:(userId:number)=>({ type: 'FOLLOW', userId }as const),

    unfollowSuccess:(userId:number)=>({ type: 'UNFOLLOW', userId }as const),
    
    setUsers:(users:Array<UserType>) =>({ type:'SET_USERS', users }as const),
    
    setCurrentPage: (currentPage:number) =>({type: 'SET_CURRENT_PAGE', currentPage}as const),
    
    setTotalUsersCount: (totalUsersCount:number) =>({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount}as const),
    
    setIsFetching: (isFetching:boolean) =>({type: 'TOGGLE_IS_FETCHING', isFetching}as const),
    
    toggleFollowingProgress: (followingProgress:boolean, userId:number) => 
        ({type:'TOGGLE_IN_FOLLOWING_PROGRESS', isFetching: followingProgress, userId}as const)
    
}

type ActionTypes = InferActionsType<typeof actions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

type DispatchType = Dispatch<ActionTypes>;

export const requestUsers =(currentPage:number,pageSize:number): ThunkType => async (dispatch, getState) => {
    dispatch(actions.setIsFetching(true));        
    let result = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(actions.setUsers(result.items));
        dispatch(actions.setIsFetching(false));
        dispatch(actions.setTotalUsersCount(result.totalCount));
        dispatch(actions.setCurrentPage(currentPage));
}

const followUnfollowFlow = async(dispatch: DispatchType, userId:number, actionMethod:any,
      actionCreator: (userId: number)=>ActionTypes)=>{
    dispatch(actions.toggleFollowingProgress(true,userId));
        let result = await actionMethod(userId);
        if(result.resultCode === 0)
        {
            dispatch(actionCreator(userId));
            dispatch(actions.toggleFollowingProgress(false,userId));
        }
}
export const follow =(userId:number): ThunkType => async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI),actions.followSuccess);
}

export const unfollow =(userId:number): ThunkType=> async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unFollow.bind(usersAPI),actions.unfollowSuccess);
}

export default usersReducer;