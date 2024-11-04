import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const taskStore = createSlice({
    name: 'task',
    initialState: {
        tasks:[],
        taskCounts: {} 
    },
    reducers:{
        setTasks(state, action){
            state.tasks = action.payload
        },
        addTask(state, action){
            state.tasks.push(action.payload)
        },
        setTaskCounts(state, action) {
            state.taskCounts = action.payload;
        },
        removeTask(state, action) {
            state.tasks = state.tasks.filter(task => task._id !== action.payload);
        },
    }
})

const url = process.env.REACT_APP_BACKEND_URL;
const {setTasks, addTask, setTaskCounts, removeTask} = taskStore.actions

const fetchTasks = () => {
    return async(dispatch) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            return;
        }
        try {
            const response = await axios.get(`${url}/task?userId=${userId}`);
            console.log("Fetched tasks:", response.data); 
            dispatch(setTasks(response.data));
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }
}

const createTask = (taskData) => {
    return async(dispatch) => {
        try {
            const response = await axios.post(`${url}/task`, taskData);
            dispatch(addTask(response.data));
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }
}

const fetchTaskCounts = () => {
    return async (dispatch) => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            return;
        }
        try {
            const response = await axios.get(`${url}/task/count?userId=${userId}`);
            dispatch(setTaskCounts(response.data.count));
        } catch (error) {
            console.error("Error fetching task counts:", error);
        }
    }
};

const deleteTask = (taskId) => {
    return async (dispatch) => {
        try {
            await axios.delete(`${url}/task/${taskId}`);
            dispatch(removeTask(taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
};

const selectTaskCounts = (state) => state.task.taskCounts;

export {fetchTasks, createTask, fetchTaskCounts, selectTaskCounts, deleteTask}

export default taskStore.reducer