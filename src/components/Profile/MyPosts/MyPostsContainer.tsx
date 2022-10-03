import React from 'react';
import { actions } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import {connect} from "react-redux";
import { reset } from 'redux-form';
import { AppStateType } from '../../../redux/reduxStore';
import { Dispatch } from 'redux';
import { PostsType } from '../../../types/types';

type MapStatePropsType = {
  posts: Array<PostsType>
}
type MapDispatchPropsType = {
  addPost: (postText: string) => void
}


let mapStateToProps = (state: AppStateType): MapStatePropsType=>{
  return{
    posts: state.profilePage.posts
  }
}
let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType=>{
  return{
      addPost: (postText:string)=>{
        dispatch(actions.addPostActionCreator(postText));
        dispatch(reset('post'));
      }
  }
}
const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps,mapDispatchToProps)(MyPosts);
export default MyPostsContainer;