import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';


const Navbar = ()=>{
    return(
      // <div className={style.navBox}>
        <nav className ={style.menu}>
        <div className={style.item}><NavLink className = { navData => navData.isActive ? style.active : '' } to="/profile">Profile</NavLink></div>
        <div className={style.item}><NavLink className = { navData => navData.isActive ? style.active : '' } to="/dialogs">Messages</NavLink></div>
        <div className={style.item}><NavLink className = { navData => navData.isActive ? style.active : '' } to="/news">News</NavLink></div>
        <div className={style.item}><NavLink className = { navData => navData.isActive ? style.active : '' } to="/users">Users</NavLink></div>
        <div className={style.item}><NavLink className = { navData => navData.isActive ? style.active : '' } to="/music">Music</NavLink></div>
        <div className={style.item}><NavLink className = { navData => navData.isActive ? style.active : '' } to="/settings">Settings</NavLink></div>
      </nav>
      //</div>
    );
}
export default Navbar;
