import style from './Settings.module.css';
import plug from '../../assets/images/settingPlug.png'
const Settings = (props)=>{
    return(<div className={style.content}>
        <img className={style.plug} src={plug}></img>
    </div>);
}
export default Settings;