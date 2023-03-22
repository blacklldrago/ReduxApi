import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import { axiosRequest } from '../utils/axiosRequest';
export const getTodo = createAsyncThunk(
    "todo/getTodo",
     async function (){
        try {
            const {data=[]} = await axiosRequest.get("todo");
            return data
            
        } catch (error) {

        }
    }
)
export const deleteTodo = createAsyncThunk(
    "todo/deleteTodo",
     async function (id, {dispatch}){
        try {
            const {data=[]} = await axiosRequest.delete(`todo/${id}`);
            dispatch(getTodo())
            return data
            
        } catch (error) {

        }
    }
)
export const addTodo = createAsyncThunk(
    "todo/addTodo",
     async function (text, {dispatch}){
        try {
            const obj = {
                id : new Date().getTime(),
                title:text,
                complete:false 
            }
            const {data=[]} = await axiosRequest.post(`todo`, obj);
            dispatch(getTodo())
            return data
            
        } catch (error) {
        }   
    }
)
export const completeTodo = createAsyncThunk(
    "todo/completeTodo",
    async function (id, {dispatch, getState}){
        const obj1 = getState().todos.ar.find(e=>e.id == id)
        try {
            const {data} = await axiosRequest.put(`todo/${id}`,
            {
                title:obj1.title,
                complete:!obj1.complete
            }
            );
            dispatch(getTodo())
            // console.log(data);
            return data
        } catch (error) {
            
        }
    }
)
export const editTodo = createAsyncThunk(
    "todo/editTodo",
     async function (obj, {dispatch}){
        try {
            const {id} = obj
            const {data} = await axiosRequest.put(`todo/${id}`, obj);
            dispatch(getTodo())
            return data
            
        } catch (error) {

        }
    }
)
const slice =createSlice({
    name:'todos',
    initialState:{
        ar:[],
        error:null,
    },
    reducers:{
    },
    extraReducers:{
        [getTodo.pending] : (state)=>{
            state.error = null
        },
        [getTodo.fulfilled] : (state, action)=>{
            state.ar = action.payload
        },
        [getTodo.rejected] : (state, action)=>{
            state.ar=[]
        }, 
    },
})


// export const {loading} = slice.actions;
export default slice.reducer;