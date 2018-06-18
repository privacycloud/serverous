import { pathExists } from 'fs-extra';
import { join } from 'path';

import { DummyMocker } from './DummyMocker';
import { FunctionMocker } from './FunctionMocker';
import { JsonMocker } from './JsonMocker';
import { Mocker } from './Mocker';

interface FactoryOptions {
  base?: string;
  method: string;
  path: string;
}

const BASE_MOCK_DIR = '/etc/mocks';

export type MockerFactoryFunction = (options: FactoryOptions) => Promise<Mocker>;

export const factory: MockerFactoryFunction = async ({ base = BASE_MOCK_DIR, method, path }) => {
  if (await pathExists(join(base, path, `${method}.json`))) {
    return new JsonMocker({ filePath: join(base, path, `${method}.json`) });
  } else if (await pathExists(join(base, path, `${method}.js`))) {
    return new FunctionMocker({ filePath: join(base, path, `${method}.js`) });
  } else {
    return new DummyMocker();
  }
};
