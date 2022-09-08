import { useState } from 'react';
import Preloader from '../../common/preloader/preloader';
import Contacts from './Contacts';
import style from './ProfileInfo.module.css';
const ProfileDetailsForm = (props)=>{
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
              {props.isOwner && <button onClick={props.goToEditMode}>Edit</button>}  
              <button onClick={()=>{
                isFullInfo? setFullInfo(false):setFullInfo(true);
              }}>{isFullInfo?"Less":"More"}</button>
              {isFullInfo && <div className={style.contacts}>
                <div>Contacts</div>       
                  {/* <div className={style.headerContact + " " + style.contact}><b>GitHub</b>: {props.profile.contacts.github}</div> */}
                  {Object.keys(props.profile.contacts).map(key => {
                    if(props.profile.contacts[key])
                    return <Contacts key={key} contactTitle={key} ContactValue={props.profile.contacts[key]}/>
                  }                     
                  )}                  
              </div> } 
      </div>
    );
}

export default ProfileDetailsForm;
