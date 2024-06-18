export interface IApiRes<T> {
  success: boolean;
  payload?: T;
  message?: string;
}

export interface IApiQrRes extends IApiRes<void> {
  link: string;
}

export interface IApiValidationError {
  fieldName: string;
  constraints: string[];
}

export interface IRefreshRes {
  accessToken: string;
}

