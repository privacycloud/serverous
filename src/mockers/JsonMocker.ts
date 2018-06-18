import { readJson } from 'fs-extra';

import { Mock, Mocker } from './Mocker';

interface JsonMockerOptions {
  filePath: string;
}

export class JsonMocker implements Mocker {
  private filePath: string;

  constructor({ filePath }: JsonMockerOptions) {
    this.filePath = filePath;
  }

  public get(): Promise<Mock> {
    return readJson(this.filePath);
  }
}
