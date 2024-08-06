import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Icon} from 'react-icons-kit';
import {trash} from 'react-icons-kit/feather/trash';
import {edit2} from 'react-icons-kit/feather/edit2';
import { handleCheckbox, removeTodo } from '../redux/todoapp/actions';
import { IoMdStar, IoMdStarOutline } from 'react-icons/io';

const Todos = ({handleEditClick, editFormVisibility}) => {

  const dispatch =useDispatch();
  const todos =useSelector((state)=>state.operationsReducer);

   return todos.map((todo)=>(
    <>
  <div className='mx-10'>
  <div key={todo.id} className='todo-box my-7 px-5  flex'>
     <div className='flex justify-between w-full'>
     <div className="content flex gap-4 text-[17px] ">
            {editFormVisibility===false&&(
 <input type="checkbox" checked={todo.completed}
 onChange={()=>dispatch(handleCheckbox(todo.id))}></input>
            )}
         <p style={todo.completed===true?{textDecoration:'line-through'}:{textDecoration:'none'}}>
         {todo.todo}
         </p>
        </div>
        <div className='actions-box flex  gap-4'>
        {editFormVisibility===false&&(
         <>
           <span className='mt-1 text-[20px]'><IoMdStarOutline/></span>
           <span onClick={()=>handleEditClick(todo)}><Icon icon={edit2}/></span>
           <span onClick={()=>dispatch(removeTodo(todo.id))}><Icon icon={trash}/></span>
         </>
          )}

        </div>

     </div>
    </div>
    <hr></hr>
  
  </div>
  
  </>
  ))
}

export default Todos
