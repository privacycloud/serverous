import { Mock, Mocker } from './Mocker';

export class DummyMocker implements Mocker {
  public get(): Promise<Mock> {
    return Promise.resolve({});
  }
}
