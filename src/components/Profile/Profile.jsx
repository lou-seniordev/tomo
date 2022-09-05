import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
const Profile = ({profile, status, updateStatus,isOwner, saveProfile})=>{
    return(
        <div className={style.profile}>
          <ProfileInfo profile={profile} 
                       status={status} 
                       updateStatus={updateStatus} 
                       isOwner={isOwner} 
                       saveProfile={saveProfile}/>        
        <MyPostsContainer />
      </div>
    );
}
export default Profile;