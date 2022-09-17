import React from 'react';
import {connect} from 'react-redux';
import { follow, setUsers, toggleFollowingProgress, unfollow, requestUsers } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/preloader';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors';
import { UserType } from '../../types/types';

type Props = {
    currentPage:number, 
    pageSize: number,
    requestUsers: (currentPage: number, pageSize: number) => void,
    isFetching: boolean,
    totalUsersCount: number, 
    onPageChanged: (pageNumber: number)=>void       
    users: Array<UserType>,
    followingInProgress: Array<number>,
    unfollow: (userId:number)=>void,
    follow:  (userId:number)=>void      
}

class UsersAPI extends React.Component<Props>
{
    componentDidMount(){
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }
    onPageChanged = (p:number) =>{
        const {pageSize} = this.props;
         this.props.requestUsers(p, pageSize);
    }
    render(){
        
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount} 
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            onPageChanged={this.onPageChanged}
            follow = {this.props.follow}
            unfollow = {this.props.unfollow}
            followingInProgress = {this.props.followingInProgress}/>
            </>;
    }
}

let mapStateToProps =(state:any)=>{
    return{
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default  connect(mapStateToProps, 
    { follow, unfollow, setUsers, toggleFollowingProgress, requestUsers })(UsersAPI);