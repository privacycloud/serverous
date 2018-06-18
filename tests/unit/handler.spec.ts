import { Request, ResponseToolkit } from 'hapi';
import { noop } from 'lodash';
import { handler } from '../../src/handler';
import { DummyMocker } from '../../src/mockers/DummyMocker';
import { MockerFactoryFunction } from '../../src/mockers/factory';

describe('handler', () => {
  it('returns a function which uses the injected factory to create the mock', () => {
    expect.assertions(1);

    const factory: MockerFactoryFunction = jest.fn(() => Promise.resolve(new DummyMocker()));
    const subject = handler({ factory, path: '/foo/bar' });

    subject({ method: 'get' } as Request, { response: noop } as ResponseToolkit);

    expect(factory).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'get',
        path: '/foo/bar',
      }),
    );
  });

  it('returns a function which returns a mock', async () => {
    expect.assertions(1);

    const factory: MockerFactoryFunction = () => Promise.resolve(new DummyMocker());

    const subject = handler({ factory, path: '' });

    const response = await subject({ method: 'get' } as Request, {} as ResponseToolkit);

    expect(response).toEqual({});
  });
});
