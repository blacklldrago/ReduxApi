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
const slice =createSlice({
    name:'todos',
    initialState:{
        ar:[],
        // status:'',
        error:null,
        // loading:false
    },
    reducers:{
        // addTodo:(state, action)=>{
        //     const { payload } = action;
        //     state.ar.push(payload);
        // },
        // removeTodo:(state, action)=>{
        //     const { payload } = action;
        //     state.ar = state.ar.filter((e)=>{
        //         return e.id !== payload
        //     })
        // },
        // completeTodo:(state, action)=>{
        //     const { payload } = action;
        //     state.ar.map((e)=>{
        //         if(e.id === payload){
        //         e.complete =!e.complete;
        //         }
        //     })      
        // }
    },
    extraReducers:{
        [getTodo.pending] : (state)=>{
            // state.loading = true,
            state.error = null
        },
        [getTodo.fulfilled] : (state, action)=>{
            // state.loading = false,
            state.ar = action.payload
        },
        [getTodo.rejected] : (state, action)=>{
            // state.loading = false,
            state.ar=[]
        }, 
    },
})


// export const {loading} = slice.actions;
export default slice.reducer;