import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const friendStore = createSlice({
    name: 'friend',
    initialState: {
        followedFriends: []
    },
    reducers:{
        setFollowedFriends(state, action){
            state.followedFriends = action.payload
        },
        addFollowedFriend(state, action){
            state.followedFriends.push(action.payload)
        },
        removeFollowedFriend(state, action){
            state.followedFriends = state.followedFriends.filter(friend => friend._id !== action.payload);
        }
    }
})

const url = process.env.REACT_APP_BACKEND_URL;
const {setFollowedFriends,addFollowedFriend, removeFollowedFriend} = friendStore.actions

const fetchFriendsData = () => {
    return async(dispatch) => {
        const userId = localStorage.getItem('userId'); 
        if(!userId) return
        try{
            const response = await axios.get(`${url}/${userId}/followedFriends`)
            dispatch(setFollowedFriends(response.data.followedFriends))
        }catch(error){
            console.error('error fetching followed friends:', error)
        }
    }
}

const followFriend = (friendId) => {
    return async(dispatch) => {
        const userId = localStorage.getItem('userId')
        if (!userId) return
        const response = await axios.post(`${url}/follow`,{
            userId,
            friendId
        })
        dispatch(addFollowedFriend({ _id: friendId, name: response.data.name, profileImg: response.data.profileImg}))
    }
}

const unfollowFriend = (friendId) => {
    return async(dispatch) => {
        const userId = localStorage.getItem('userId')
        if (!userId) return;
        try {
            await axios.post(`${url}/unfollow`, { userId, friendId });
            dispatch(removeFollowedFriend(friendId));
            console.log('Unfollowed:', friendId);
        } catch (error) {
            console.error('Error unfollowing friend:', error);
        }
    }
}

export {fetchFriendsData, followFriend, unfollowFriend,  setFollowedFriends}
export default friendStore.reducer