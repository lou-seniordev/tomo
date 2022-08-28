import MyPostsContainer from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
const Profile = ({profile, status, updateStatus})=>{
    return(
        <div className={style.profile}>
          <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>        
        <MyPostsContainer />
      </div>
    );
}
export default Profile;