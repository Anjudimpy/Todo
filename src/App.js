
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Form from './Components/Form';
import Header from './Components/Header';
import Todos from './Components/Todos';
import { deleteAll } from './redux/todoapp/actions';
import { useEffect, useState } from 'react';
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

    const [isVisible, setIsVisible] = useState(true);

       const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

  return (
 <>
 <Header toggleVisibility={toggleVisibility} />
    <div className=' sm:flex  justify-center sm:mx-14 mx-3 my-20'>
     
     <div className=''>
      <LeftTodo isVisible={isVisible}/>
     </div>
     <div className='w-full'>
     <Form editFormVisibility={editFormVisibility} editTodo={editTodo}
      cancelUpdate={cancelUpdate}/>
      <Todos handleEditClick={handleEditClick} editFormVisibility={editFormVisibility}/>
      {todos.length > 0 &&(
      <div className='flex justify-end mt-5 w-full'>
      
       <div>
       <button
      onClick={()=>dispatch(deleteAll())} 
        className='py-2 md:text-[15px] text-[10px]   md:px-5 px-3 md:mx-10 rounded-md text-white  bg-red-500'>DELETE ALL</button>
       </div>
   
      </div>

    )}
   </div>
    
    </div>
    </>
  );
}


export default App;

