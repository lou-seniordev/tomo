import React from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer, { withRouter } from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import {connect} from 'react-redux';
import {compose} from "redux";
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/preloader/preloader';

class App extends React.Component {
  componentDidMount(){
    this.props.initializeApp();
    
  }
  render(){ 
    if(!this.props.initialized)
    return <Preloader/>
    return(
            
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
            
  );
  }
}

const mapStateToProps = (state)=>({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);
