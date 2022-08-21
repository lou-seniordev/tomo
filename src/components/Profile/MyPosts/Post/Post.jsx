import style from './Post.module.css';
const Post = (props)=>{
    return(                
          <div className={style.item}>
            <img className={style.avatar} alt='user avatar' src='https://i.pinimg.com/736x/b8/69/5f/b8695f007aea9a08a0419479217ca6aa.jpg'/>
            {props.text}<br/>
            <span>{props.likesCount} likes</span>
          </div>             
    );
}
export default Post;