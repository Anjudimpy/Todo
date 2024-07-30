import { ADD_TODO, DELETE_ALL, REMOVE_TODO, UPDATE_CHECKBOX, UPDATE_TODO } from "../actions";

const initialState=[
    {id:1, todo:'create report', completed:false},
    {id:2, todo:'create work', completed:false},
    {id:3, todo:'create file', completed:true},

];
export const operationsReducer=(state=initialState, action)=>{
    switch(action.type){
       
        case ADD_TODO:
            return[...state, action.payload];
        case  DELETE_ALL:
            return [];   
        case REMOVE_TODO: 
             const filteredTodos= state.filter((todo)=>todo.id!==action.payload);
             return filteredTodos;
        case UPDATE_TODO:
            let data= action.payload;
            const upadatedArray=[];
            state.map((item)=>{
                if(item.id===data.id){
                    item.id = data.id;
                    item.todo =data.todo;
                    item.completed = data.completed;
                }
                upadatedArray.push(item);
            })
            return upadatedArray

            case UPDATE_CHECKBOX:
                let todoArray=[];
                state.map((item)=>{
                    if(item.id===action.payload){
                        item.completed =!item.completed;
                    }
                    todoArray.push(item);
                })
                return todoArray;

        default: return state;
    }

}