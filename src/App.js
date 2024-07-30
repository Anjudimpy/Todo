
import { useDispatch } from 'react-redux';
import './App.css';
import Form from './Components/Form';
import Header from './Components/Header';
import Todos from './Components/Todos';

function App() {
  const dispatch =useDispatch();
  return (
    <div className=''>
    <Form/>
    <Todos/>
    <button 
    
    className='p-2 mx-20 bg-red-500'>DELETE ALL</button>
    </div>
  );
}

export default App;

