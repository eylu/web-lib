/*********************************** action 类型常量 *************************************/

/**
 * 更改 TODO 状态
 * @type {String}
 */
export const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';

export const ADD_NEW_TODO = 'ADD_NEW_TODO';

export const SET_FILTER = 'SET_FILTER';

/*********************************** action 创建函数 *************************************/

/**
 * 更改 TODO 状态
 * @param  {Number} id TODO索引
 * @return {Object}       action
 */
export function changeTodoStatus(id){
    return {type: TOGGLE_TODO_STATUS, id};
}

export function addNewTodo(text){
    return {type: ADD_NEW_TODO, text};
}

export function filterTodoList(filter){
    return {type: SET_FILTER, filter};
};