import { ValueTransformer } from "typeorm";

export const booleanToBitTransformer: ValueTransformer = {
    to: (value: boolean) => (value ? 1 : 0),  
    from: (value: number) => !!value          
  };