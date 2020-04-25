import { AxiosResponse } from "axios";

export type AxiosSuccess<T> = AxiosResponse<{ response: T }>;
export type AxiosError<T> = AxiosResponse<{ error: T }>;