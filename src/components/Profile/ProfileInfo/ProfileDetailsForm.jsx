import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';
import Contacts from './Contacts';
import style from './ProfileInfo.module.css';
import { Field } from "redux-form";
const ProfileDetailsForm = ({handleSubmit, contacts, initialValues, error})=>{
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <div><button>Save</button></div>
          {error && <div className={style.formSummaryError}>{error}</div>}
          <div>About me : </div>       
          {createField("I like pizza!","aboutMe", [], Textarea,{})}         
          <div>Looking for a job</div>
          {createField("","lookingForAJob", [], Input,{type:"checkbox"})}
          <div>Description</div>
          {createField("My professional skills","lookingForAJobDescription", [], Textarea)}
          {Object.keys(contacts).map(key => {
                    if(true)
                    return <div key={key}>
                      <b>{key}</b>: 
                      {createField(key,"contacts."+key,[], Input)}
                    </div>
                  }                     
                  )}
      </form>
      <textarea placeholder='test' value={"some text"}></textarea>
      </div>
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
