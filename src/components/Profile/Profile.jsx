import MyPostsContainer from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
const Profile = (props)=>{
    return(
        <div className={style.profile}>
          <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>        
        <MyPostsContainer />
      </div>
    );
}
export default Profile;