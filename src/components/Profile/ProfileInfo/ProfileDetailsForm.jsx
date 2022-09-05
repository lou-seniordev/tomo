import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';
import Preloader from '../../common/preloader/preloader';
import style from './ProfileInfo.module.css';
const ProfileDetailsForm = (props)=>{
  if(!props.profile){
    return <Preloader></Preloader>
  }
    return(
        <form onSubmit={props.handleSubmit}>
          <div><button>Save</button></div>
          <div>About me : {props.profile.aboutMe}</div>
          {createField("I like pizza!","aboutMe", [], Textarea)}
         
          <div>Looking for a job</div>
          {createField("","lookingForAJob", [], Input,{type:"checkbox"})}
          <div>Description</div>
          {createField("My professional skills","lookingForAJobDescription", [], Textarea)}
      </form>
    );
}
const ProfileDetailsFormRedux = reduxForm({form: 'profileEdit'})(ProfileDetailsForm);

const Contacts = ({contactTitle, ContactValue})=>{
  return <div className={style.contact}><b>{contactTitle}</b>: {ContactValue}</div>
}
export default ProfileDetailsFormRedux;
