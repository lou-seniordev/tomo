import React from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import { withRouter } from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import {connect} from 'react-redux';
import {compose} from "redux";
import { initializeApp } from './redux/appReducer';
import Preloader from './components/common/preloader/preloader';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import SettingsContainer from './components/Settings/SettingsContainer';
const DialogsContainer = React.lazy(()=>import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(()=>import('./components/Profile/ProfileContainer'));
const LoginContainer = React.lazy(()=>import('./components/Login/LoginContainer'));
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
                    <Route path='/news' element={<News/>}/>
                    <Route path='/music' element={<Music/>}/>
                    <Route path='/users' element={<UsersContainer/>}/>
                    <Route path='/settings' element={<SettingsContainer/>}/>
                  </Routes>
                  <React.Suspense fallback={<Preloader />}>
                  <Routes>  
                      <Route path='/profile' element={<ProfileContainer />}/>  
                      <Route path='/dialogs' element={<DialogsContainer />}/>     
                      <Route path='/profile/:userId/' element={<ProfileContainer />}/> 
                      <Route path='/login' element={<LoginContainer/>}/>
                  </Routes>
                  </React.Suspense>
                  
                </div>
              </div>
            
  );
  }
}

const mapStateToProps = (state)=>({
  initialized: state.app.initialized
})

const AppContainer =  compose(
  withRouter,
  connect(mapStateToProps, {initializeApp}))(App);

const MainApp = (props)=>{
  return <HashRouter>
  <Provider store={store}>
    <AppContainer />  
  </Provider>
</HashRouter >
}
export default MainApp;