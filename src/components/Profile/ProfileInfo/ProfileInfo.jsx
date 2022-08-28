import Preloader from '../../common/preloader/preloader';
import style from './ProfileInfo.module.css';
import noPic from '../../../assets/images/default.jpg';
import ProfileStatusWithHooks from '../ProfileStatusWithHooks';
const ProfileInfo = (props)=>{
  if(!props.profile){
    return <Preloader></Preloader>
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
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <span>About me : {props.profile.aboutMe}</span>
              </div>
              <div className={style.jobInfo}>         
                <span>{props.profile.lookingForAJob ? <div>Looking for a job<br/>Description: {props.profile.lookingForAJobDescription}</div>: ""}</span>
              </div>      
            </div>
          </div>
          <hr/>
      </div>
    );
}
export default ProfileInfo;
// src='https://i.pinimg.com/736x/b8/69/5f/b8695f007aea9a08a0419479217ca6aa.jpg'