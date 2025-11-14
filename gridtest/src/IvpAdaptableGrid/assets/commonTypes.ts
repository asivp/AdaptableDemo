type RResultInfo<T = any> = {
    Result: T,
    Exception: string,
    FailureMessage: string,
    IsSuccess: boolean,
    StatusCode: string
}

enum RStatusCode {
    Ok,
    UnAuthorized,
    Notauthenticated,
    Notauthourized,
    Badrequest,
    InternalServerError,
    NotFound,
    Forbidden,
}

interface Result<T> {
    Exception?: string;
    FailureMessage?: string;
    IsSuccess: boolean;
    Result: T;
    StatusCode: RStatusCode;
}

export type { RResultInfo, Result };
export { RStatusCode };