import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todoapp/actions';



const Form = () => {
    const dispatch= useDispatch();

    const [todoValue, setTodoValue]= useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        let date = new Date();
        let time = date.getTime();
        let todoObj={
            id:time,
            todo:todoValue,
            completed: false
        }
        setTodoValue('');
        dispatch(addTodo(todoObj))
    }

  return (
   <form  className=' m-10' onSubmit={handleSubmit}>
    <label>Add Task</label>
    <div className="flex gap-4">
        <input className="outline" type="text"  required 
        value={todoValue} onChange={(e)=>setTodoValue(e.target.value)} />
        <button className="bg-green-700 p-2 " type="submit">Add Task</button>

    </div>
    <div>

    </div>
   </form>
  )
}

export default Form
