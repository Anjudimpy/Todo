import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo, handleEditSubmit } from '../redux/todoapp/actions';
import { IoMdArrowDropdown, IoMdCalendar } from 'react-icons/io';
import { CiBellOn } from "react-icons/ci";
import { FaArrowsRotate } from "react-icons/fa6";
import { IoTodayOutline } from 'react-icons/io5';



const Form = ({editFormVisibility, editTodo, cancelUpdate}) => {

    const dispatch= useDispatch();

    const [todoValue, setTodoValue] = useState('');

    const [editValue, setEditValue] = useState('');
    useEffect(()=>{
          setEditValue(editTodo.todo)
    },[editTodo])

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
    const editSubmit =(e) =>{
        e.preventDefault();
        let editedObj={
            id:editTodo.id,
            todo: editValue,
            completed: false
        }
        dispatch(handleEditSubmit(editedObj))
    }

  return (
    <>
    <div className='mx-10'>
        <div className=' flex mb-2 '>
        <span>To Do </span><IoMdArrowDropdown className='text-[20px] mt-1'/>
    
        </div>
        <hr></hr>
    </div>
    {editFormVisibility===false?(
        <form  className=' mx-10 bg-green-50  border-b-2 py-10 px-5 h-40' onSubmit={handleSubmit}>
   <div className='text-[15px] text-gray-500 mb-14'>Add A Task</div>
   <div className='flex justify-between w-full'>
    <div className='flex gap-3 '>
<CiBellOn className='text-[30px]'/>
{/* <FaArrowsRotate className='text-[30px]  text-gray-700'/> */}
<IoTodayOutline className='text-[25px]'/>
    </div>
    <div className="flex justify-end w-full gap-2">
        <input className=" rounded-md px-5" type="text"  required 
        value={todoValue} onChange={(e)=>setTodoValue(e.target.value)} />
        <button className="bg-[#11560342] py-1 text-green-800 px-2 text-[15px] rounded-md " type="submit">Add Task</button>
    </div>
    <div>
    </div></div>
    
   </form>
    ):(
        <form  className='mx-10 bg-green-50  border-b-2 py-10 px-5 h-40' onSubmit={editSubmit}>
        <div className='text-[15px] text-gray-500 mb-14'>Update A Task</div>
        <div className='flex justify-between w-full'>
    <div className='flex gap-3 '>
<CiBellOn className='text-[30px]'/>
{/* <FaArrowsRotate className='text-[30px]  text-gray-700'/> */}
<IoTodayOutline className='text-[25px]'/>
    </div>
    <div className="flex justify-end w-full gap-2">
            <input className="rounded-md px-5" type="text"  required 
             value={editValue || ""} onChange={(e)=>setEditValue(e.target.value)}/>
            <button className="bg-[#11560342] py-1 text-green-800 px-2 text-[15px] rounded-md " type="submit">UPDATE TASK</button>
        </div>
        <button type='button' className='bg-[#fd232a42] py-1 mx-2 text-red-800 px-2 text-[15px] rounded-md'
        onClick={cancelUpdate}
        >BACK</button>
        <div>
        </div>
    <div>
    </div></div>
       </form>  
    )}
   
   </>
  )
}

export default Form
