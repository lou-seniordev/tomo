import { useState } from 'react';
import { ContactsType, ProfileType } from '../../../types/types';
import Preloader from '../../common/preloader/preloader';
import Contacts from './Contacts';
import style from './ProfileInfo.module.css';

type PropsType = {
  profile: ProfileType,
  isOwner: boolean,
  goToEditMode: ()=>void,

}

const ProfileDetailsForm: React.FC<PropsType> = (props)=>{
  let [isFullInfo, setFullInfo] = useState(false);

  if(!props.profile){
    return <Preloader></Preloader>
  }
    return(
        <div className={style.profileDetails}>
          <div><span>About me :</span> {props.profile.aboutMe}</div>
          <div className={style.jobInfo}>         
                <span>{props.profile.lookingForAJob ? <div>Looking for a job <div>
                  <span>Description:</span> {props.profile.lookingForAJobDescription}</div></div>: ""}</span>
              </div>
              <div className={style.buttonsDiv}>
              
              <button onClick={()=>{
                isFullInfo? setFullInfo(false):setFullInfo(true);
              }}>{isFullInfo?"Less":"More"}</button>
              {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}  
              </div>
              {isFullInfo && <div className={style.contacts}>
                <div>Contacts</div>       
                  {Object.keys(props.profile.contacts).map(key => {
                    if(props.profile.contacts[key as keyof ContactsType])
                    return <Contacts key={key} contactTitle={key} ContactValue={""+props.profile.contacts[key as keyof ContactsType]}/>
                  }                     
                  )}                  
              </div> } 
      </div>
    );
}

export default ProfileDetailsForm;
