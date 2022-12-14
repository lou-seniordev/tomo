import {Action, applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import authReducer from "./authReducer";
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";
import usersReducer from "./usersReducer";
import thunk, { ThunkAction } from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import appReducer from "./appReducer";
import settingsReducer from "./settingsReducer";


let rootReducer = combineReducers({
    profilePage : profileReducer,
    dialogPage : dialogsReducer,
    sidebar : sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    settings: settingsReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsType<T> = T extends{[key: string]:(...args:any[])=>infer U} ? U : never ;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
window.__store__ = store;

export default store;