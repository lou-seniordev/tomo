import MyPostsContainer from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
const Profile = ({profile, status, updateStatus,isOwner})=>{
    return(
        <div className={style.profile}>
          <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner}/>        
        <MyPostsContainer />
      </div>
    );
}
export default Profile;