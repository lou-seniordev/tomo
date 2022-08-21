import style from './Header.module.css';
import img from './../../assets/Tomo-logos/Tomo-2.png';
import { NavLink } from 'react-router-dom';

const Header = (props)=>{
    
    return(
        
        <header className={style.header}>
        <img alt='' src={img}/>
        <div className={style.loginBlock}>
            {props.isAuth ? <div><b>{props.login}</b><div><button onClick={props.logout} className={style.logout}>Logout</button></div></div> : 
            <NavLink to={"/login"} className={style.login}>Login</NavLink> }
            
            
        </div>
        </header>
    );
}
export default Header;
// D:\progg\ReactLessons\tryOne\react-app\public\Tomo-logos\Tomo-logos_transparent.png
// ./../../../public/Tomo-logos/Tomo-logos_transparent.png