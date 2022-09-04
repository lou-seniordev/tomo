import style from './Settings.module.css';
import plug from '../../assets/images/settingPlug.png';
import cameraPic from '../../assets/images/Camera.ico';
import noPic from '../../assets/images/default.jpg';
import Preloader from '../common/preloader/preloader';

const Settings = (props)=>{
    let onUserPhotoChange = (e)=>{
        if(e.target.files.length)
        {
            props.savePhoto(e.target.files[0]);
        }
    }
    if(!props.profile)
    return <Preloader/>
    return(<div className={style.content}>
        <img className={''} src={''}></img>
        <div>
        <img className={style.avatar} 
        
              src={props.profile.photos.large != null ? props.profile.photos.large : noPic} />
            <label for="photoButton" className={style.photoButtonLabel}>Choose photo</label>
            <input type={"file"} id="photoButton" className={style.photoButton} onChange={onUserPhotoChange}></input>
        
        <p>User Name : {props.user.login}</p>
        <p>Email : {props.user.email}</p>

        </div>
    </div>);
}
export default Settings;