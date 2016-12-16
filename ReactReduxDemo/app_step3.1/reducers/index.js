import { combineReducers } from 'redux';

import { TOGGLE_TODO_STATUS, ADD_NEW_TODO, SET_FILTER } from '../actions/index';    // 引入 action ，使用 action 类型常量


function todoList(state=[], action){
    switch(action.type){
        case TOGGLE_TODO_STATUS:
            var index = state.findIndex((todo)=>{ return todo.id==action.id });
            var todo = state.find((todo)=>{ return todo.id==action.id });
            return [
                ...state.slice(0, index),
                Object.assign({}, todo, {
                  status: !todo.status
                }),
                ...state.slice(index + 1)
            ];
        case ADD_NEW_TODO:
            return [
                ...state,
                {
                    id: state.length+1,
                    title: action.text,
                    status: false,
                }
            ];
        default :
            return state;
    }

}

function setFilter(state='', action){
    switch(action.type){
        case SET_FILTER:
            return action.filter;
        default :
            return state;
    }
}

const reducers = combineReducers({
    todos: todoList,
    filter: setFilter,
});

export default reducers;