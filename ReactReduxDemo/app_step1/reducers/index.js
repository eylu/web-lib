import { combineReducers } from 'redux';

// 这是一个空的 reducer , 不做任何处理，返回原始 state
function todoList(state=[], action){
    return state;
}

const reducers = combineReducers({
    todos: todoList
});

export default reducers;