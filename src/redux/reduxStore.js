import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunk from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";


let reducers = combineReducers({
    profilePage : profileReducer,
    dialogPage : dialogsReducer,
    sidebar : sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});
let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;