import { join } from 'path';
import { FunctionMocker } from '../../../src/mockers/FunctionMocker';

describe('FunctionMocker', () => {
  describe('#get', () => {
    let fakeImport: (path: string) => Promise<any>;

    beforeEach(() => {
      fakeImport = jest.fn(() => {
        return {
          default: () => {
            return {
              name: 'Bob',
              type: 'dog',
              woof: true,
            };
          },
        };
      });
    });

    it('calls the importer function with the requested path', async () => {
      expect.assertions(1);

      const filePath = join(__dirname, '../../fixtures/foo/js/get.js');
      const subject = new FunctionMocker({ filePath, importer: fakeImport });

      await subject.get();

      expect(fakeImport).toHaveBeenCalledWith(filePath);
    });

    it('returns the mock object', async () => {
      expect.assertions(1);

      const filePath = join(__dirname, '../../fixtures/foo/js/get.js');
      const subject = new FunctionMocker({ filePath, importer: fakeImport });

      const mock = await subject.get();

      expect(mock).toEqual({
        name: 'Bob',
        type: 'dog',
        woof: true,
      });
    });
  });
});
