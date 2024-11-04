import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const postStore = createSlice({
    name:'post',
    initialState:{
        posts:[],
        selectedPosts:[]
    },
    reducers:{
        setPosts(state, action){
            state.posts = action.payload
        },
        setSelectedPosts(state,action){
            state.selectedPosts = action.payload
        },
        addPost(state, action) {
            state.posts.unshift(action.payload);
        },
        deletePost(state, action){
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
    }
})

const url = process.env.REACT_APP_BACKEND_URL;
const {setPosts, setSelectedPosts, addPost, deletePost } = postStore.actions

const fetchPostsData = () => {
    return async(dispatch) => {
        try{
            const response = await axios.get(`${url}/post`)
            const updatePosts = response.data.map(post => ({
                ...post,
                profileImg: post.profileImg ? `${url}/upload/${post.profileImg}` : '/assets/profile-blank.png'
            }))
            dispatch(setPosts(updatePosts))
        }catch(error){
            console.error('Error fetching posts', error)
        }
    }
}
const selectThreeRandomPosts = () => {
    return async(dispatch) => {
        const response = await axios.get(`${url}/post`)
        const posts = response.data
        const selectedPosts = posts
            .sort(() => 0.5 - Math.random())
            .slice(0,3)
        dispatch(setSelectedPosts(selectedPosts))
    }
}

const uploadPost = (formData) => {
    return async(dispatch) => {
        try{
            const response = await axios.post(`${url}/post`, formData)
            const newPost = {
                ...response.data,
                profileImg: response.data.profileImg ? `${url}/upload/${response.data.profileImg}` : '/assets/profile-blank.png'
            };
            dispatch(addPost(newPost))
        }catch(error){
            console.error('error uploading post', error)
        }
    }
}

const deletePostById = (postId) => async(dispatch) => {
    try{
        await axios.delete(`${url}/post/${postId}`);
        dispatch(deletePost(postId));
    }catch(error){
        console.error('Error deleting post:', error);
    }
}

export {fetchPostsData,selectThreeRandomPosts, uploadPost,deletePostById}
export default postStore.reducer