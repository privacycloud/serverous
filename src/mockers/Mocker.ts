import { Request, ResponseToolkit } from 'hapi';

export type Mock = string | object | undefined;

export interface GetOptions {
  h: ResponseToolkit;
  req: Request;
}
export interface Mocker {
  get(options?: GetOptions): Promise<Mock>;
}
