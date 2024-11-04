import { createSlice } from "@reduxjs/toolkit";

const taskFormStore = createSlice({
    name: 'taskForm',
    initialState: {
        name: '',
        title: '',
        dateStart: '',
        dateEnd: '',
        selectedPriority: 'Low',
        selectedStatus: 'On track',
        description: ''
    },
    reducers:{
        setName(state, action){
            state.name = action.payload; 
        },
        setTitle(state, action){
            state.title = action.payload;
        },
        setDateStart(state, action){
            state.dateStart = action.payload;
        },
        setDateEnd(state, action){
            state.dateEnd = action.payload;
        },
        setDescription(state, action){
            state.description = action.payload;
        },
        setSelectedPriority(state, action){ 
            state.selectedPriority = action.payload;
        },
        setSelectedStatus(state, action){ 
            state.selectedStatus = action.payload;
        },
        resetForm: () => ({
            name: '',
            title: '',
            dateStart: '',
            dateEnd: '',
            selectedPriority: 'Low',
            selectedStatus: 'On track',
            description: '',
        }),
    }
})

export const { setName, setTitle, setDateStart, setDateEnd, setDescription, setSelectedPriority, setSelectedStatus, resetForm } = taskFormStore.actions;

export default taskFormStore.reducer;