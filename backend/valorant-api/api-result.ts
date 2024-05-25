export enum ApiResultType {
    FAILURE,
    SUCCESS,
}

export type ApiResult<T, U extends number> = {
    value: T;
    type: U;
    errorMessage?: string;
};

export function createApiResult<T, U extends number>(value: T, type: U, errorMessage: string = ''): ApiResult<T, U> {
    return errorMessage.length === 0 ? {value, type} : {value, type, errorMessage};
}
