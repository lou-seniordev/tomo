import style from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import PostBox from './PostForm';
import { PostsType } from '../../../types/types';

type Props = {
  posts: Array<PostsType>,
  addPost: (postText: string)=>void
}

const MyPosts: React.FC<Props> = React.memo(props=>{
  
    let postElements = [...props.posts].reverse().map(p=><Post key={p.id} text={p.post} likesCount={p.likesCount}/>);
  let addPost = (value: any) =>{
    props.addPost(value.postText);
  }  
    return(        
        <div className={style.postBlock}>
          <div>
            <PostBox addPost={addPost}/>
          </div>       
        <div >
          {postElements}
        </div>
        </div>
    );
  
  
});
export default MyPosts;