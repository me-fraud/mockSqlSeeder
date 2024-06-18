import { IApiValidationError } from "@/interfaces/IApiResponse.interface";

export const convertValidationErrors = (errors: IApiValidationError[]): string => {
  return errors
    .map((e) => {
      return e.constraints.join('. ');
    })
    .join(' ');
};