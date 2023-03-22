import { useSelect } from '@mui/base'
import { Input, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useState, useEffect,  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, getTodo, completeTodo } from '../../reducers/todos'
import { deleteTodo } from '../../reducers/todos'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const Todo = () => {

  const dispatch  = useDispatch();
  
  const [text, setText] = useState("");
  const [moment, setMoment] = useState("All");
  const todos = useSelector(state=>state.todos.ar)
  // console.log(todos);
  useEffect(()=>{
    dispatch(getTodo());
  },[dispatch])

  const addNewTodo = ()=>{
    if(text.trim().toLowerCase() == 0){
      return alert("Please enter todo ....")
    }
    else{
      dispatch(addTodo(text))
      setText("")
    }
  }
  return (
    <div className=" text-center bg-[orange] w-[500px] m-auto rounded-[20px] pb-[60px] mt-[20px]">
      <h1 className="text-[50px] font-[700]">Todo List</h1>
      <div className="text-center mt-[20px] ">
        <Input  className="pl-[10px] outline-none  ml-[20px] h-[40px] w-[250px] bg-[white] text-[black]  font-[500] text-[20px]" value={text} onChange={(e) => setText(e.target.value)} />
        <button className=" outline-none rounded-[10px] ml-[20px] h-[40px] w-[70px] bg-[#48FD2C] text-[black]  font-[500] text-[20px]" onClick={() => addNewTodo()}>
          <AddIcon fontSize="large"/>
        </button>
        <Select className=" outline-none rounded-[10px] ml-[20px] h-[40px] w-[68px] bg-[#18EEF7] text-[black] text-[20px] font-[500] " value={moment} onChange = {(e)=>setMoment(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="complete">Comp</MenuItem>
            <MenuItem value="uncomplete">Unc</MenuItem>
        </Select>
      </div>
      {
        text.trim().length == 0 ? (todos.filter((e)=>{
          if(moment == "complete"){
              return e.complete
          }
          else if(moment == "uncomplete"){
              return !e.complete
          }
          return e
  
        }).map((e)=>{
          return (<div>
            
            {e.complete ? (
                    <h1 className="line-through text-[20px] text-[black] font-[600] mb-[20px]">{e.title}</h1>
                  ) : (
                    <h1 className="text-[20px] text-[black] font-[600] mb-[20px]">{e.title}</h1>
                  )}
            <div className="flex justify-center">
                  <div>

                  <button className="block rounded-[10px] h-[40px] w-[100px] bg-[yellow] text-[black]  font-[500] text-[20px] mr-[20px]" onClick={() => dispatch(completeTodo(e.id))}>
                    <CheckIcon fontSize="large" />
                  </button>
                  </div>
                  <div>
                  <button className="rounded-[10px]  h-[40px] w-[100px] bg-[red] text-[black]  font-[500] text-[20px] mr-[20px]" onClick={() => dispatch(deleteTodo(e.id))}>
                  <DeleteIcon fontSize="large"/>

                  </button>
                  </div>
            </div>
          </div>)
        })):(todos.filter((e)=>{return e.title.toLowerCase().includes(text.toLowerCase())}).filter((e)=>{
          if(moment == "complete"){
              return e.complete
          }
          else if(moment == "uncomplete"){
              return !e.complete
          }
          return e
  
        }).map((e)=>{
          return (<div>
            {e.complete ? (
                    <h1 className="line-through text-[20px] text-[black] font-[600] mb-[20px]">{e.title}</h1>
                  ) : (
                    <h1 className="text-[20px] text-[black] font-[600] mb-[20px]">{e.title}</h1>
                  )}
            
            <div className="flex justify-center">
                  <div>

                  <button className="block rounded-[10px] h-[40px] w-[100px] bg-[yellow] text-[black]  font-[500] text-[20px] mr-[20px]" >
                    <CheckIcon fontSize="large" />
                  </button>
                  </div>
                  <div>
                  <button className="rounded-[10px]  h-[40px] w-[100px] bg-[red] text-[black]  font-[500] text-[20px] mr-[20px]" onClick={() => dispatch(deleteTodo(e.id))}>
                  <DeleteIcon fontSize="large"/>

                  </button>
                  </div>
            </div>
          </div>)
        }))
      }
    </div>
  )
}

export default Todo