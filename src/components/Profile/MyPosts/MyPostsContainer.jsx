import React from 'react';
import { addPostActionCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from "react-redux";
import { reset } from 'redux-form';

let mapStateToProps = (state)=>{
  return{
    posts: state.profilePage.posts
  }
}
let mapDispatchToProps = (dispatch)=>{
  return{
      addPost: (postText)=>{
        dispatch(addPostActionCreator(postText));
        dispatch(reset('post'));
      }
  }
}
const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);
export default MyPostsContainer;