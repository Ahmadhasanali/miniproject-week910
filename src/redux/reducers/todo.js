import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    todoList: [
        {id: '1', status: "incomplete", time: "12/13/2022, 8:39:55 PM", title: "test"},
        {id: '2', status: "complete", time: "12/19/2022, 8:39:55 PM", title: "Something new"},
    ]
};

const todoSlice = createSlice({
    name: 'todo',
    initialState
})

export const {} = todoSlice.actions;
export default todoSlice.reducer;