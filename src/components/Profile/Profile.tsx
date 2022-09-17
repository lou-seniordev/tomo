import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import style from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type Props = {
  profile: ProfileType, 
  status: string, 
  isOwner: boolean, 
  updateStatus: (status:string)=>void,
  saveProfile: (formData: any)=>void,
  children?: any
}

const Profile: React.FC<Props> = ({profile, status, updateStatus, isOwner, saveProfile})=>{
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