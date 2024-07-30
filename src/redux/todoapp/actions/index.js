
export const ADD_TODO ='ADD_TODO';
export const addTodo=(payload)=>{
    return{
        type: 'ADD_TODO',
        payload
    }
}