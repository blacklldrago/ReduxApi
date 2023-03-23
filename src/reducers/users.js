import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import { axiosRequest } from '../utils/axiosRequest';
export const getUsers = createAsyncThunk(
    "users/getUsers",
     async function (){
        try {
            const {data} = await axiosRequest.get("user");
            return data
            
        } catch (error) {

        }
    }
    )
export const addUsers = createAsyncThunk(
        "users/addUsers",
         async function (text, {dispatch}){
            try {
                const obj = {
                    avatar:text.avatar,
                    name:text.name,
                    surname:text.surname,
                    birthday:text.birthday,
                    isMarried:text.isMarried
                }
                const {data} = await axiosRequest.post(`user`, obj);
                dispatch(getUsers())
                return data
                
            } catch (error) {
            }   
        }
)
export const deleteUsers = createAsyncThunk(
    "users/deleteUsers",
     async function (id, {dispatch}){
        try {
            const {data=[]} = await axiosRequest.delete(`user/${id}`);
            dispatch(getUsers())
            return data
            
        } catch (error) {

        }
    }
)
export const editUsers = createAsyncThunk(
    "users/editUsers",
     async function (obj, {dispatch}){
        try {
            const {data} = await axiosRequest.put(`user/${obj.id}`, obj);
            dispatch(getUsers())
            return data
            
        } catch (error) {

        }
    }
)
const slice =createSlice({
    name:'users',
    initialState:{
        users:[],
        error:null,
    },
    reducers:{
    },
    extraReducers:{
        [getUsers.pending] : (state)=>{
            state.error = null
        },
        [getUsers.fulfilled] : (state, action)=>{
            state.users = action.payload
        },
        [getUsers.rejected] : (state, action)=>{
            state.users=[]
        }, 
    },
})


// export const {loading} = slice.actions;
export default slice.reducer;