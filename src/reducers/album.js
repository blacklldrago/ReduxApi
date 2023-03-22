import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import { axiosRequest } from '../utils/axiosRequest';


export const getAlbum = createAsyncThunk(
    "album/getAlbum",
     async function (){
        try {
            const {data} = await axiosRequest.get("album");
            // console.log(data);
            return data
            
        } catch (error) {

        }
    }
)
export const addAlbum = createAsyncThunk(
    "album/addAlbum",
     async function (obj, {dispatch}){
        try {
            const {data} = await axiosRequest.post(`album`, obj);
            dispatch(getAlbum())
            return data
            
        } catch (error) {
        }   
    }
)
export const deleteAlbum = createAsyncThunk(
    "album/deleteAlbum",
     async function (id, {dispatch}){
        try {
            const {data} = await axiosRequest.delete(`album/${id}`);
            dispatch(getAlbum())
            return data
            
        } catch (error) {

        }
    }
)
export const editAlbum = createAsyncThunk(
    "album/editAlbum",
     async function (obj, {dispatch}){
        try {
            const {id} = obj
            const {data} = await axiosRequest.put(`album/${id}`, obj);
            dispatch(getAlbum())
            return data
            
        } catch (error) {

        }
    }
)
const slice =createSlice({
    name:'album',
    initialState:{
        album:[],
        error:null,
    },
    reducers:{
    },
    extraReducers:{
        [getAlbum.pending] : (state)=>{
            state.error = null
        },
        [getAlbum.fulfilled] : (state, action)=>{
            state.album = action.payload
        },
        [getAlbum.rejected] : (state, action)=>{
            state.album=[]
        }, 
    },
})


// export const {loading} = slice.actions;
export default slice.reducer