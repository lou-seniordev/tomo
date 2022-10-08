import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLength } from "../../../utils/Validators";
import { createField, Textarea } from "../../common/FormControls/FormControls";
import { NewPostFormType } from "./MyPosts";
import style from './MyPosts.module.css';
const maxLengthValidator = maxLength(300);

type NewPostFormKeysType = Extract<keyof NewPostFormType, string>
type Props = {}
const PostForm: React.FC<InjectedFormProps<NewPostFormType, Props> & Props> = (props)=>{   
    return(<div>
        <form onSubmit={props.handleSubmit} className={style.postForm}>
            <div className={style.postContainer}>
                {createField<NewPostFormKeysType>("Post","postText", [maxLengthValidator], Textarea)}
            </div>
            <div className={style.postButton}><button>Post</button></div>
        </form>
    </div>)
}
export default reduxForm<NewPostFormType>({form: 'post'})(PostForm);



























// const PostBox = (props)=>{
//     const onSubmit=(formData)=>{
//         props.addPost(formData)
//     }
//     return(<div>
//         <PostReduxForm onSubmit={onSubmit}/>
//     </div>);
// }

//export default PostBox;