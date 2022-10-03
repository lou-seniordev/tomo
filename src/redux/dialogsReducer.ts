import { InferActionsType } from "./reduxStore";

type DialogType ={
    id: number,
    name: string,
    ava: string | null
}
type MessageType ={
    id: number,
    message: string
}
let initialState = {
    dialogs: [
        {id: 1, name: "Jerry Boul", ava:"https://images.unsplash.com/photo-1628563694622-5a76957fd09c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW5zdGFncmFtJTIwcHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"}, 
        {id:2, name:"Jim Carrey", ava:"https://www.cinema.de/sites/default/files/styles/schema_org/public/sync/cms3.cinema.de/imgdb/stars/jim-carrey-imago80012260h.jpg?itok=fgaySOSf"}, 
        {id:3, name: "Arisa Smith", ava: "https://wallpaperaccess.com/full/6295120.jpg"},
        {id:4, name: "Samanta Jackerson", ava:"https://qph.cf2.quoracdn.net/main-qimg-217015358349186e0e382cb15c5d7c63-lq"}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hi"}, 
        {id:2,  message:"How are you?"}, 
        {id:3,  message: "Awesome, and you?"},
        {id:4,  message: "Same!"}
    ] as Array<MessageType>
}
type ActionTypes = InferActionsType<typeof actions>
const dialogsReducer = (state = initialState, action:ActionTypes) =>{

    switch(action.type){
        case 'ADD_NEW_MESSAGE':
        {
            return {
                ...state,
                newMessageText: "",
                messages: [...state.messages, {id: 5, message: action.newMessage}]
            };
             
        }
        
        default: return state;
    }
}
export const actions = {
    addMessageActionCreator: (newMessage: string)=>({ type: 'ADD_NEW_MESSAGE', newMessage }),
}

export default dialogsReducer;