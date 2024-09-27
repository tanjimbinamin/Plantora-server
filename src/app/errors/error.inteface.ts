export interface IErrorSource {
  path: string;
  message: string;
}

export type genericErrorReturn = {
  statusCode: number;
  message: string;
  errorSource: IErrorSource[];
};
