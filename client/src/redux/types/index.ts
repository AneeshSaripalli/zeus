export type MainReducerState = {
    jwt: string | null
};

export type Action<T> = {
    payload: T,
    type: string
}


export const MainReducerName = "main";

export type GlobalState = {
    [MainReducerName]: MainReducerState
}