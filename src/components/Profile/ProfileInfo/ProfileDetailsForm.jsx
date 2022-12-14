import { reduxForm, propTypes } from 'redux-form';
import { createField, Input, Textarea } from '../../common/FormControls/FormControls';
import {connect} from 'react-redux';
import style from './ProfileInfo.module.css';
import { ContactsType } from '../../../types/types';

// type PropsType = {
//   handleSubmit: ()=>void, 
//   contacts: ContactsType, 
//   error: any
// }
// : React.FC<PropsType>
const ProfileDetailsForm = ({handleSubmit, contacts, error})=>{
    return(
      <div className={style.profileDetails}>
        <form onSubmit={handleSubmit}>
          
          {error && <div className={style.formSummaryError}>{error}</div>}
          <div>About me : </div>       
          {createField("I like pizza!","aboutMe", [], Textarea,{})}         
          <div>Looking for a job</div>
          {createField("","lookingForAJob", [], Input,{type:"checkbox"})}
          <div>Description</div>
          {createField("My professional skills","lookingForAJobDescription", [], Textarea)}
          {Object.keys(contacts).map(key => {
                    return <div key={key}>
                      <b>{key}</b>: 
                      {createField(key,"contacts."+key,[], Input)}
                    </div>
                  }                     
                  )}
          <div><button>Save</button></div>
      </form>
      </div>
    );
}
let ProfileDetailsFormRedux = reduxForm({form: 'profileEdit', enableREinitialize: true, destroyOnUnmount: false})(ProfileDetailsForm);
ProfileDetailsFormRedux = connect(
  state => ({   
    initialValues: state.profilePage.profile
  }),
  {} 
)(ProfileDetailsFormRedux);

export default ProfileDetailsFormRedux;
