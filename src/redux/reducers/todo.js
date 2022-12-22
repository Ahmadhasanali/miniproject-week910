import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = 'http://13.214.149.116/todos'
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    // todoList: [
    //     // {id: '1', status: "incomplete", time: "1671814799999", todo: "test", description: "test description", priority: '3'},
    //     // {id: '2', status: "incomplete", time: "1671469199999", todo: "test", description: "test description", priority: '3'},
    //     // {id: '2', status: "complete", time: "12/19/2022, 8:39:55 PM", todo: "Something new"},
    // ],
    todoList: [],
    weekTodoList: [],
    isLoading: false,
    error: null
};

export const fetchTodo = createAsyncThunk(
    'fetchTodo',
    async (payload, thunkApi) => {
        try {
            const { data } = await axios.get(API_URL, { headers: { authorization: `Bearer ${user.token}` } })
            return thunkApi.fulfillWithValue(data['data'])
        } catch (err) {
            return thunkApi.rejectWithValue(err);
        }
    }
)

export const postTodo = createAsyncThunk(
    'postTodo',
    async (payload, thunkApi) => {
        try {
            await axios.post(API_URL, payload, { headers: { authorization: `Bearer ${user.token}` } })
            const { data } = await axios.get(API_URL, { headers: { authorization: `Bearer ${user.token}` } })
            return thunkApi.fulfillWithValue(data['data'])

        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'deleteTodo',
    async(payload, thunkApi) => {
        try {
            await axios.post(API_URL+`/delete/${payload}`, null, { headers: { authorization: `Bearer ${user.token}` } })
            const { data } = await axios.get(API_URL, { headers: { authorization: `Bearer ${user.token}` } })
            return thunkApi.fulfillWithValue(data['data'])
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const checkTodo = createAsyncThunk(
    'checkTodo',
    async(payload, thunkApi) => {
        try {
            await axios.post(API_URL+`/check/${payload.todoId}`, null, { headers: { authorization: `Bearer ${user.token}` } })
            const { data } = await axios.get(API_URL, { headers: { authorization: `Bearer ${user.token}` } })
            thunkApi.dispatch(checkTodo)
            return thunkApi.fulfillWithValue(data['data'])
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

export const updateTodo = createAsyncThunk(
    'updateTodo',
    async(payload, thunkApi)=>{
        try {
            await axios.post(API_URL+`/update/${payload.todoId}`, {todo: payload.todo, priority: payload.priority, description: payload.description, status: payload.status}, { headers: { authorization: `Bearer ${user.token}` } })
            const {data} = await axios.get(API_URL, { headers: { authorization: `Bearer ${user.token}` } })
            console.log(data['data']);
            return thunkApi.fulfillWithValue(data['data'])
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        checkTodo: (state, action) =>{
            const todoUpdate = (state.todoList).forEach((todo) => {
                if (todo.todoId === action.payload.todoId) {
                    todo.status = action.payload.status
                }
            })
            state.todoList = todoUpdate
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoList = action.payload;
                state.error = null;
            })
            .addCase(fetchTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(postTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(postTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoList = action.payload;
                state.error = null;
            })
            .addCase(postTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoList = action.payload;
                state.error = null;
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todoList = action.payload;
                state.error = null;
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

// export const { } = todoSlice.actions;
export default todoSlice.reducer;