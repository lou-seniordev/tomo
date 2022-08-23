import React from 'react';
import {connect} from 'react-redux';
import { follow, setCurrentPage, setUsers, toggleFollowingProgress, unfollow, requestUsers } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/preloader';
import {getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from '../../redux/usersSelectors';


class UsersAPI extends React.Component{
    componentDidMount(){
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
        // this.props.setIsFetching(true);
        
        // usersAPI.requestUsers(this.props.currentPage, this.props.pageSize).then(result => {
        //         this.props.setUsers(result.items);
        //         this.props.setIsFetching(false);
        //         this.props.setTotalUsersCount(result.totalCount);
        //     });
    }
    onPageChanged = (p) =>{
         this.props.requestUsers(p, this.props.pageSize);
         this.props.setCurrentPage(p);
        // this.props.setIsFetching(true);
        // usersAPI.requestUsers(p, this.props.pageSize).then(result => {
        //         this.props.setUsers(result.items);
        //         this.props.setIsFetching(false);
        //     });
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


// let mapStateToProps =(state)=>{
//     return{
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress
//     }
// }
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
    { follow, unfollow, setUsers, setCurrentPage, toggleFollowingProgress, requestUsers })(UsersAPI);