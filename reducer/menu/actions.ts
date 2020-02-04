import { menuTypes } from "./types";

export const getMenu = (param: any) => ({
    type: menuTypes.GET,
    query: param
});

export const getMenuSuccess = (payload: any) =>({
    type: menuTypes.GET_SUCCESS,
    payload: payload
});

export const getMenuFailure = (message: any) => ({
    type: menuTypes.GET_FAILURE,
    payload: message
});