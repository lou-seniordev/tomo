import Preloader from '../../common/preloader/preloader';
import style from './ProfileInfo.module.css';
import noPic from '../../../assets/images/default.jpg';
import ProfileStatusWithHooks from '../ProfileStatusWithHooks';
import ProfileDetails from './ProfileDetails';
import { useState } from 'react';
import ProfileDetailsForm from './ProfileDetailsForm';
const ProfileInfo = (props)=>{
  const [editMode, setEditMode] = useState(false);
  if(!props.profile){
    return <Preloader></Preloader>
  }
  let onSubmit = (formData)=>{
    props.saveProfile(formData);
  }
    return(
        <div>
          <div className={style.profileHead}>
            <img className={style.profileBackground} src='https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg?w=2000'/>
            <div>
              <img className={style.avatar} 
              src={props.profile.photos.large != null ? props.profile.photos.large : noPic} />
              
              <div className={style.mainInfo}>
                <h2>{props.profile.fullName}</h2>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} isOwner={props.isOwner}/>               
              </div>
              {editMode ?
              <ProfileDetailsForm profile={props.profile} onSubmit={onSubmit}/> :
              <ProfileDetails goToEditMode={()=>{setEditMode(true)}}profile={props.profile} isOwner={props.isOwner}/>
              }
            </div>
          </div>
          <hr/>
      </div>
    );
}
export default ProfileInfo;
// src='https://i.pinimg.com/736x/b8/69/5f/b8695f007aea9a08a0419479217ca6aa.jpg'