import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';
import Contacts from './Contacts';
import style from './ProfileInfo.module.css';
import { Field } from "redux-form";
const ProfileDetailsForm = ({handleSubmit, contacts, initialValues})=>{
    return(
        <form onSubmit={handleSubmit}>
          <div><button>Save</button></div>
          <div>About me : </div>       
          {createField("I like pizza!","aboutMe", [], Textarea, {value: initialValues.aboutMe})}         
          <div>Looking for a job</div>
          {createField("","lookingForAJob", [], Input,{type:"checkbox"})}
          <div>Description</div>
          {createField("My professional skills","lookingForAJobDescription", [], Textarea)}
          {Object.keys(contacts).map(key => {
                    if(true)
                    return <div>
                      <Contacts key={key} contactTitle={key} ContactValue={contacts[key]}/>
                      {createField(key+"/profile.com",key,[], Input)}
                    </div>
                  }                     
                  )}
      </form>
    );
}
let ProfileDetailsFormRedux = reduxForm({form: 'profileEdit',enableREinitialize: true})(ProfileDetailsForm);
// ProfileDetailsFormRedux = connect(
//   state => ({
//     initialValues: state.profilePage.profile
//   }),
//   {} 
// )(ProfileDetailsFormRedux);

export default ProfileDetailsFormRedux;
