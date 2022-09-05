import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';
import Preloader from '../../common/preloader/preloader';
import Contacts from './Contacts';
import { Field } from "redux-form";
import style from './ProfileInfo.module.css';
const ProfileDetailsForm = (props)=>{
  if(!props.profile){
    return <Preloader></Preloader>
  }
    return(
        <form onSubmit={props.handleSubmit}>
          <div><button>Save</button></div>
          <div>About me : {props.profile.aboutMe}</div>
          <Field name={"fullName"} component={"input"} type={"hidden"} value={props.profile.fullName}/>
          {createField("I like pizza!","aboutMe", [], Textarea)}
          
          <div>Looking for a job</div>
          {createField("","lookingForAJob", [], Input,{type:"checkbox"})}
          <div>Description</div>
          {createField("My professional skills","lookingForAJobDescription", [], Textarea)}
          {Object.keys(props.profile.contacts).map(key => {
                    if(true)
                    return <div>
                      <Contacts key={key} contactTitle={key} ContactValue={props.profile.contacts[key]}/>
                      {createField(key+"/profile.com",key,[], Input)}
                    </div>
                  }                     
                  )}
      </form>
    );
}
const ProfileDetailsFormRedux = reduxForm({form: 'profileEdit'})(ProfileDetailsForm);


export default ProfileDetailsFormRedux;
