import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

adasdsad
let store = {
    _state: {
        profilePage:{
            posts: [
                {id: 1, post: "Wassup!", likesCount:2}, 
                {id:2,  post:"There's first usage of props", likesCount:17} 
            ],
            newPostText: ""
        },
        dialogPage:{
            dialogs: [
                {id: 1, name: "Jerry Boul", ava:"https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}, 
                {id:2, name:"Jim Carrey", ava:"https://www.cinema.de/sites/default/files/styles/schema_org/public/sync/cms3.cinema.de/imgdb/stars/jim-carrey-imago80012260h.jpg?itok=fgaySOSf"}, 
                {id:3, name: "Arisa Smith", ava: "https://wallpaperaccess.com/full/6295120.jpg"},
                {id:4, name: "Samanta Jackerson", ava:"https://qph.cf2.quoracdn.net/main-qimg-217015358349186e0e382cb15c5d7c63-lq"}
            ],
            messages: [
                {id: 1, message: "Hi"}, 
                {id:2,  message:"How are you?"}, 
                {id:3,  message: "Awesome, and you?"},
                {id:4,  message: "Same!"}
            ],
            newMessageText: ""
        },
        sidebar:{

        }    
    },
    _callSubscriber() {},
    getState(){
        return this._state;
    },   
    subscribe(observer){
        this._callSubscriber = observer;
    }, 
    dispatch(action){

        this._state.profilePage= profileReducer(this._state.profilePage, action);
        this._state.dialogPage= dialogsReducer(this._state.dialogPage, action);
        this._state.sidebar= sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);
    }
}



export default store;
window.store = store;