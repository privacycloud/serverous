import faker from 'faker';
import { GetOptions, Mock, Mocker } from './Mocker';

type Importer = (path: string) => Promise<any>;

interface FunctionMockerOptions {
  filePath: string;
  importer?: Importer;
}

export class FunctionMocker implements Mocker {
  private filePath: string;
  private importer: Importer | undefined;

  constructor({ filePath, importer }: FunctionMockerOptions) {
    this.filePath = filePath;
    this.importer = importer;
  }

  public import(path: string): Promise<any> {
    if (this.importer) {
      return this.importer(path);
    } else {
      return import(path);
    }
  }

  public async get({ req, h }: GetOptions = {} as GetOptions): Promise<Mock> {
    const mockFn = (await this.import(this.filePath)).default;

    return mockFn({ faker, h, req });
  }
}
