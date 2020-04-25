import axios, { AxiosResponse } from 'axios';
import { AxiosSuccess } from "../../types";
import { Action } from "../types";

export const MAIN_SET_JWT = "MAIN_SET_JWT";


export const setJWT = (jwt: string): Action<string> => {
    localStorage.setItem('jwt', jwt);

    return {
        type: MAIN_SET_JWT,
        payload: jwt
    }
}

export const fetchSetJWT = (dispatch: any) => (account: object) => {
    console.log('response out')
    return axios.get('/api/jwt', {
        params: {
            account: JSON.stringify(account)
        }
    }).then((response: AxiosResponse<{ response: string }>) => {
        console.log(response.data.response, response.data)
        dispatch(setJWT(response.data.response));
    });
}

export const checkLSForJWT = (dispatch: any) => () => {
    const jwt: string | null = localStorage.getItem('jwt');

    if (jwt !== null) {
        console.log("Found jwt in local storage")
        // login done, just reload from localstorage into redux
        dispatch(setJWT(jwt));
    }
}