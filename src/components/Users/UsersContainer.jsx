import React from 'react';
import {connect} from 'react-redux';
import { follow, setUsers, toggleFollowingProgress, unfollow, requestUsers } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/preloader';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors';


class UsersAPI extends React.Component{
    componentDidMount(){
        const {currentPage, pageSize} = this.props;
        this.props.requestUsers(currentPage, pageSize);
    }
    onPageChanged = (p) =>{
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
            followed={this.props.followed}
            follow = {this.props.follow}
            unfollow = {this.props.unfollow}
            followingInProgress = {this.props.followingInProgress}/>
            </>;
    }
}

let mapStateToProps =(state)=>{
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