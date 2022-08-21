import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';



function App(props) {
  return (
    <BrowserRouter>
    <div className = 'app-wrapper'>
      <HeaderContainer/>
      <Navbar/>
      <div className = 'app-wrapper-content'>
      <Routes>
        <Route path='/profile/:userId/' element={<ProfileContainer />}/>
        <Route path='/profile' element={<ProfileContainer />}/>
        <Route path='/dialogs' element={<DialogsContainer />}/>        
        <Route path='/news' element={<News/>}/>
        <Route path='/music' element={<Music/>}/>
        <Route path='/users' element={<UsersContainer/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/login' element={<LoginContainer/>}/>
      </Routes>
      </div>
    </div>
   </BrowserRouter>
  );
}

export default App;
