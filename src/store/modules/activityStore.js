import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const activityStore = createSlice({
    name: 'activity',
    initialState:{
        activities:[]
    },
    reducers:{
        setActivities(state, action){
            state.activities = action.payload
        }
    }
})

const {setActivities} = activityStore.actions
const url = process.env.REACT_APP_BACKEND_URL;
const fetchEventData = () => {
    return async(dispatch) => {
        try {
            const response = await axios.get(`${url}/event`)
            dispatch(setActivities(response.data))
        } catch (error) {
            console.error("Error fetching activities:", error)
        }
    }
}

export {fetchEventData}
export default activityStore.reducer