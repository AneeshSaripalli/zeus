export type MainReducerState = {
    jwt: string | null
};

export type Action<T> = {
    payload: T,
    type: string
}