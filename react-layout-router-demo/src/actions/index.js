
export const TOGGLE_SHOW_SNACKBAR = 'TOGGLE_SHOW_SNACKBAR';



/************** action 创建函数 ****************/

export function toggleSnackbar(status){
    return {
        type: TOGGLE_SHOW_SNACKBAR,
        data: status,
    }
}

