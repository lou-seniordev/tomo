import profileReducer, { actions } from "./profileReducer";

let state = {
    posts: [
        {id: 1, post: "Wassup!", likesCount:2}, 
        {id:2,  post:"There's first usage of props", likesCount:17} 
    ],
    profile: null,
    status: "",
    newPostText: ""
}

test('new post should be added', () => {
    let action = actions.addPostActionCreator("test"); 
    let newState = profileReducer(state,action);
    expect(newState.posts.length).toBe(3);
  });
  test('new post test should be "test"', () => {
    let action = actions.addPostActionCreator("test");   
    let newState = profileReducer(state,action);
    expect(newState.posts[2].post).toBe("test");
  });
  // test('after deleting length of post array should be decremented', () => {
  //   let action = actions.deletePost(1);   
  //   let newState = profileReducer(state,action);
  //   expect(newState.posts.length).toBe(1);
  // });
