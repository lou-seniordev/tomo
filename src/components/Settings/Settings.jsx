import style from './Settings.module.css';
import plug from '../../assets/images/settingPlug.png'
import noPic from '../../assets/images/default.jpg';
const Settings = (props)=>{
    let onUserPhotoChange = (e)=>{
        if(e.target.files.length)
        {
            props.savePhoto(e.target.files[0]);
        }
    }
    return(<div className={style.content}>
        <img className={''} src={''}></img>
        <div>
        <img className={style.avatar} 
              src={props.profile.photos.large != null ? props.profile.photos.large : noPic} />
        <input type={"file"} onChange={onUserPhotoChange}></input>
        <p>User Name : {props.user.login}</p>
        <p>Email : {props.user.email}</p>

        </div>
    </div>);
}
export default Settings;