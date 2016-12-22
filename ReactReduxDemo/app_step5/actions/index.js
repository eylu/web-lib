/*********************************** action 类型常量 *************************************/

import fetchData from '../utils/fetch-data';

export const INIT_TODO_LIST = 'INIT_TODO_LIST';
/**
 * 更改 TODO 状态
 * @type {String}
 */
export const TOGGLE_TODO_STATUS = 'TOGGLE_TODO_STATUS';

export const ADD_NEW_TODO = 'ADD_NEW_TODO';

export const SET_FILTER = 'SET_FILTER';

/*********************************** action 创建函数 *************************************/

export function initTodoList(){
    return function(dispatch){
        fetchData('list_message').then((data)=>{
            dispatch({
                type: INIT_TODO_LIST,
                list: data,
            })
        });
    }
}

/**
 * 更改 TODO 状态
 * @param  {Number} id TODO索引
 * @return {Object}       action
 */
export function changeTodoStatus(id){
    return function (dispatch){
        fetchData('toggle_message_status', { id: id}, 'PUT').then((data)=>{
            dispatch({type: TOGGLE_TODO_STATUS, status: data, id})
        });
        // setTimeout(()=>{
        //     dispatch({type: TOGGLE_TODO_STATUS, id});
        // }, 2000);
    }
    // return {type: TOGGLE_TODO_STATUS, id};
}

export function addNewTodo(text){
    return {type: ADD_NEW_TODO, text};
}

export function filterTodoList(filter){
    return {type: SET_FILTER, filter};
};