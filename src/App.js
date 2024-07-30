
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Form from './Components/Form';
import Header from './Components/Header';
import Todos from './Components/Todos';
import { deleteAll } from './redux/todoapp/actions';
import { useState } from 'react';
import LeftTodo from './Components/LeftTodo';

function App() {
  const dispatch =useDispatch();
  const todos= useSelector((state)=>state.operationsReducer);
  const [editFormVisibility, setEditFormVisibility] =useState(false);
  const [editTodo, setEditTodo]= useState('');

  const handleEditClick =(todo)=>{
    setEditFormVisibility(true);
    setEditTodo(todo);
  }
  const cancelUpdate=()=>{
    setEditFormVisibility(false);}

  return (
    <div className=' flex justify-center mx-14 my-20'>
   <div className='w-[20%] h-[900px] bg-green-50'>
    <LeftTodo/>
   </div>
   <div className='w-[80%]'>
   <Form editFormVisibility={editFormVisibility} editTodo={editTodo}
    cancelUpdate={cancelUpdate}/>
    <Todos handleEditClick={handleEditClick} editFormVisibility={editFormVisibility}/>
    {todos.length > 0&&(
    <div className='flex justify-end mt-5 w-full'>
    
     <div>
     <button
    onClick={()=>dispatch(deleteAll())} 
      className='py-2  px-5 mx-10 rounded-md text-white  bg-red-500'>DELETE ALL</button>
     </div>
 
    </div>
    )}
   </div>
    
    </div>
  );
}


export default App;

