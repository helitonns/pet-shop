export type ServiceResult<T> =
  | { success: true; message: string; data: T }
  | { success: false; message: string };

export function success<T>(data: T, message = "OK"): ServiceResult<T> {
  return { success: true, message, data };
}

export function failure<T>(message = "Erro"): ServiceResult<T> {
  return { success: false, message };
}