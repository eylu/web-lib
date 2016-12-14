import { combineReducers } from 'redux';

import { TOGGLE_TODO_STATUS, ADD_NEW_TODO } from '../actions/index';    // 引入 action ，使用 action 类型常量


function todoList(state=[], action){
    switch(action.type){
        case TOGGLE_TODO_STATUS:
            var todo = state[action.index];
            return [
                ...state.slice(0, action.index),
                Object.assign({}, todo, {
                  status: !todo.status
                }),
                ...state.slice(action.index + 1)
            ];
        case ADD_NEW_TODO:
            return [
                ...state,
                {
                    title: action.text,
                    status: false,
                }
            ];
        default :
            return state;
    }

}

const reducers = combineReducers({
    todos: todoList
});

export default reducers;