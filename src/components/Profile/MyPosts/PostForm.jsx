import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLength } from "../../../utils/Validators";
import { Textarea } from "../../common/FormControls/FormControls";
import style from './MyPosts.module.css';
const maxLengthValidator = maxLength(300);
const PostForm = (props)=>{
    
    return(<>
        <form onSubmit={props.handleSubmit} className={style.postForm}>
            <div className={style.postContainer}><Field validate={ [maxLengthValidator] }  name={"postText"} component={Textarea} placeholder={"Post"} ></Field></div>
            <div className={style.postButton}><button>Post</button></div>
        </form>
    </>)
}
const PostReduxForm = reduxForm({form: 'post'})(PostForm);

const PostBox = (props)=>{
    const onSubmit=(formData)=>{
        props.addPost(formData)
    }
    return(<div>
        <PostReduxForm onSubmit={onSubmit}/>
    </div>);
}

export default PostBox;