import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const eventStore = createSlice({
    name:'event',
    initialState:{
        events: {
            title: '',
            category: '',
            location: '',
            time: '',
            id: ''
        },
        selectedTime: '',
        userName: '',
        email: '',
        heartIconStates: {}
    },
    reducers:{
        setEvents(state, action){
            state.events = action.payload
        },
        setSelectedTime(state, action){
            state.selectedTime = action.payload
        },
        setUserName(state, action){
            state.userName = action.payload
        },
        setEmail(state, action){
            state.email = action.payload
        },
        toggleHeartIcon(state, action){
            const {eventId, isLiked} = action.payload
            state.heartIconStates[eventId] = isLiked
        }
    }
})

const url = process.env.REACT_APP_BACKEND_URL;

const {setEvents, toggleHeartIcon} = eventStore.actions

const fetchEventDetails = (eventId) => {
    return async(dispatch) => {
        try {
            const response = await axios.get(`${url}/event/${eventId}`);
            dispatch(setEvents(response.data));
        } catch (error) {
            console.error("Error fetching event details:", error);
        }
    }
}

const bookEvent = ({eventId, eventName, category, location, date, userName, email, time}) => {
    return async() => {
        const response = await axios.post(`${url}/booking`, {
            eventId,
            eventName,
            category,
            location,
            date,
            userName,
            email,
            time
        })
        console.log(response.data.message || "Booking successful!");
    }
}

const addEvent = ({ userId, eventImageUrl}) => {
    return async () => {
        try{
            const response = await axios.post(`${url}/user/event`, { userId, eventImageUrl })
            console.log("Event added:", response.data);
        }catch(error){
            console.error("Error adding event:", error.response ? error.response.data : error.message);
        }
    }
}

const removeEvent = ({userId, eventImageUrl}) => {
    return async() => {
        try{
            const response = await axios.delete(`${url}/user/event`, {
                data: { userId, eventImageUrl }
            })
            console.log("Event removed:", response.data);
        }catch(error){
            console.error("Error removing event:", error.response ? error.response.data : error.message);
        }
    }
}

const toggleHeartEvent = (activity) => {
    return async (dispatch, getState) => {
        const userId = localStorage.getItem('userId')
        const eventImageUrl = `/assets/activity${activity.id}.png`

        if (!userId) {
            alert("You must be logged in to add event.");
            return;
        }

        const state = getState();
        const heartIconStates = state.event.heartIconStates;

        const newHeartIconState =  !heartIconStates[activity.id];
        dispatch(toggleHeartIcon({ eventId: activity.id, isLiked: newHeartIconState }));

        try {
            if (newHeartIconState) {
                await dispatch(addEvent({ userId, eventImageUrl }));
            } else {
                await dispatch(removeEvent({ userId, eventImageUrl }));
            }
        } catch (error) {
            console.error("Error toggling heart event:", error.message);
        }
    }
}

export {fetchEventDetails, bookEvent, toggleHeartEvent}
export const {setEmail, setSelectedTime, setUserName} = eventStore.actions
export default eventStore.reducer
