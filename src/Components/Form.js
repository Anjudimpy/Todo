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
    <div className='xl:mx-10'>
        <div className=' flex mb-2 '>
        <span>To Do </span><IoMdArrowDropdown className='text-[20px] mt-1'/>
    
        </div>
        <hr></hr>
    </div>
    {editFormVisibility===false?(
        <form  className=' xl:mx-10 bg-green-50  border-b-2 md:py-10 py-5 px-5 md:h-40 h-28' onSubmit={handleSubmit}>
   <div className='xl:text-[15px] text-[10px] text-gray-500 md:mb-14 mb-9'>Add A Task</div>
   <div className='flex justify-between w-full'>
    <div className='flex gap-3 '>
<CiBellOn className='md:text-[30px]'/>
{/* <FaArrowsRotate className='text-[30px]  text-gray-700'/> */}
<IoTodayOutline className='md:text-[25px]'/>
    </div>
    <div className="flex justify-end w-full gap-2">
        <input className=" rounded-md px-5 lg:w-60 md:w-40 w-32" type="text"  required 
        value={todoValue} onChange={(e)=>setTodoValue(e.target.value)} />
        <button className="bg-[#11560342] lg:py-1 text-green-800 w-10 md:w-20 lg:px-2 xl:text-[15px] md:text-[10px] text-[8px] rounded-md " type="submit">Add Task</button>
    </div>
    <div>
    </div></div>
    
   </form>
    ):(
        <form  className='md:mx-10 bg-green-50  border-b-2 md:py-10 py-5 px-5 md:h-40 h-28' onSubmit={editSubmit}>
        <div className='md:text-[15px] text-[10px] text-gray-500 md:mb-14 mb-8'>Update A Task</div>
        <div className='flex justify-between w-full'>
    <div className='flex gap-3 '>
{/* <CiBellOn className='md:text-[30px]'/>
<IoTodayOutline className='md:text-[25px]'/> */}
    </div>
    <div className="flex justify-end w-full gap-2">
        
            <input className="rounded-md px-5 w-32 md:w-60 md:text-[15px] text-[10px]" type="text"  required 
             value={editValue || ""} onChange={(e)=>setEditValue(e.target.value)}/>
            <button className="bg-[#11560342] py-1 text-green-800 md:w-40 w-16 md:px-2 md:text-[15px] text-[8px]  rounded-md " type="submit">UPDATE TASK</button>
        </div>
        <button type='button' className='bg-[#fd232a42] py-1 mx-2 text-red-800 px-2 md:text-[15px] text-[8px] rounded-md'
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
