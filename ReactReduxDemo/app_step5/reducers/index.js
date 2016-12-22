import { combineReducers } from 'redux';

import { INIT_TODO_LIST, TOGGLE_TODO_STATUS, ADD_NEW_TODO, SET_FILTER } from '../actions/index';


function todoList(state=[], action){
    switch(action.type){
        case INIT_TODO_LIST:
            return [
                ...state,
                ...action.list.map((todo)=>{ return {
                    id: todo.id,
                    title: todo.title,
                    status: todo.status,
                }})
            ];
        case TOGGLE_TODO_STATUS:
            var index = state.findIndex((todo)=>{ return todo.id==action.id });
            var todo = state.find((todo)=>{ return todo.id==action.id });
            return [
                ...state.slice(0, index),
                Object.assign({}, todo, {
                  status: action.status                    // action 所对应 id 的 TODO 状态(status)，修改为 action 数据中的 status
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