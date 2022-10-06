import style from './Header.module.css';
import img from './../../assets/Tomo-logos/Tomo-2.png';
import { NavLink } from 'react-router-dom';
import PropTypes, {InferProps} from 'prop-types';

type Props = {
    login: string | null, 
    logout: ()=>void, 
    isAuth: boolean
}

const Header: React.FC<Props> = ({login, logout, isAuth})=>{   
    return(    
        <header className={style.header}>
        <img alt='' src={img}/>
        <div className={style.loginBlock}>
            {isAuth ? 
            <div className={style.userLoginBlock}>
                <div className={style.userLogin}>{login}</div>
                <div className={style.logoutButton}><button onClick={logout} className={style.logout}>Logout</button></div>
            </div> : 
            <NavLink to={"/login"} className={style.login}>Login</NavLink> }   
        </div>
        </header>
    );
}

export default Header;