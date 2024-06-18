import { AxiosError, AxiosResponse } from 'axios';
import { IApiRes } from '@/interfaces/IApiResponse.interface';
import { convertValidationErrors } from './validationErrorConverter';
import { ErrorWithStatus } from '@/interfaces/customErrors';

export const handleApiRes = async <T>(request: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const res = await request;
    return res.data as T;
  } catch (err) {
    if (err instanceof AxiosError) {
      const axiosErr = err as AxiosError<IApiRes<void>>;
      if (axiosErr.response?.data) {
        if (Array.isArray(axiosErr.response.data.message)) {
          axiosErr.response.data.message = convertValidationErrors(
            axiosErr.response.data.message,
          );
        }
        throw new ErrorWithStatus(axiosErr.response.data.message? axiosErr.response.data.message
           : 'Server error on cross-service request')
      } else {
        console.log(axiosErr)
        throw new ErrorWithStatus(axiosErr.message)
      }
    } else {
      throw new ErrorWithStatus('Internal server error');
    }
  }
};
