import style from './Header.module.css';
import img from './../../assets/Tomo-logos/Tomo-2.png';
import { NavLink } from 'react-router-dom';
import PropTypes, {InferProps} from 'prop-types';

const Header:any = ({login, logout, isAuth}:InferProps<typeof Header.propTypes>)=>{   
    return(    
        <header className={style.header}>
        <img alt='' src={img}/>
        <div className={style.loginBlock}>
            {isAuth ? <div><b>{login}</b><div><button onClick={logout} className={style.logout}>Logout</button></div></div> : 
            <NavLink to={"/login"} className={style.login}>Login</NavLink> }   
        </div>
        </header>
    );
}
Header.propTypes = {
    login: PropTypes.any,
    logout: PropTypes.any,
    isAuth: PropTypes.bool
}
export default Header;