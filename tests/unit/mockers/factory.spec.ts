import { join } from 'path';
import { DummyMocker } from '../../../src/mockers/DummyMocker';
import { factory } from '../../../src/mockers/factory';
import { FunctionMocker } from '../../../src/mockers/FunctionMocker';
import { JsonMocker } from '../../../src/mockers/JsonMocker';
import { Mocker } from '../../../src/mockers/Mocker';

describe('factory', () => {
  const base = join(__dirname, '../../fixtures');

  it('returns a JsonMockGetter when there is a JSON file for the requested path', async () => {
    expect.assertions(1);

    const mockGetter: Mocker = await factory({ base, method: 'get', path: '/foo/json' });

    expect(mockGetter).toBeInstanceOf(JsonMocker);
  });

  it('returns a FunctionMockGetter when there is a JavaScript file for the requested path', async () => {
    expect.assertions(1);

    const mockGetter: Mocker = await factory({ base, method: 'get', path: '/foo/js' });

    expect(mockGetter).toBeInstanceOf(FunctionMocker);
  });

  it('returns a DummyMockGetter when there is not any matching file for the requested path', async () => {
    expect.assertions(1);

    const mockGetter: Mocker = await factory({ base, method: 'get', path: '/foo/whatever' });

    expect(mockGetter).toBeInstanceOf(DummyMocker);
  });
});
