import { Action } from "../types";

export const MAIN_SET_JWT = "MAIN_SET_JWT";


export const setJWT = (jwt: string): Action<string> => {
    localStorage.setItem('jwt', jwt);

    return {
        type: MAIN_SET_JWT,
        payload: jwt
    }
}