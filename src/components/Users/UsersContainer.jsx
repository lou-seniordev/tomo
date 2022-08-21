import React from 'react';
import {connect} from 'react-redux';
import { follow, setCurrentPage, setUsers, toggleFollowingProgress, unfollow, getUsers } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/preloader/preloader';


class UsersAPI extends React.Component{
    componentDidMount(){
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
        // this.props.setIsFetching(true);
        
        // usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(result => {
        //         this.props.setUsers(result.items);
        //         this.props.setIsFetching(false);
        //         this.props.setTotalUsersCount(result.totalCount);
        //     });
    }
    onPageChanged = (p) =>{
         this.props.getUsers(p, this.props.pageSize);
         this.props.setCurrentPage(p);
        // this.props.setIsFetching(true);
        // usersAPI.getUsers(p, this.props.pageSize).then(result => {
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


let mapStateToProps =(state)=>{
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

// let mapDispatchToProps =(dispatch)=>{
//     return{
//         follow: (userId)=>{
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId)=>{
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users)=>{
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (currentPage)=>{
//             dispatch(setCurrentPageAC(currentPage));
//         },
//         setTotalUsersCount: (totalCount)=>{
//             dispatch(setTotalUsersCountAC(totalCount));
            
//         },
//         toggleIsFetching:(isFetching)=>{
//             dispatch(setIsFetchingAC(isFetching));
//         }
//     }
// }


export default  connect(mapStateToProps, 
    { follow, unfollow, setUsers, setCurrentPage, toggleFollowingProgress, getUsers })(UsersAPI);