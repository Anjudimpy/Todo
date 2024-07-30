import { ADD_TODO } from "../actions";

const initialState=[
    {id:1, todo:'create report', completed:false},
    {id:2, todo:'create work', completed:false},
    {id:3, todo:'create file', completed:true},

];
export const operationsReducer=(state=initialState, action)=>{
    switch(action.type){
       
        case ADD_TODO:
            return[...state, action.payload];
        default: return state;
    }

}