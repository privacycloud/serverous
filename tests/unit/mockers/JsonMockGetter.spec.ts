import { join } from 'path';
import { JsonMocker } from '../../../src/mockers/JsonMocker';

describe('JsonMocker', () => {
  describe('#get', () => {
    it('returns the expected mock obejct', async () => {
      expect.assertions(1);

      const filePath = join(__dirname, '../../fixtures/foo/json/get.json');
      const subject = new JsonMocker({ filePath });

      const mock = await subject.get();

      expect(mock).toEqual({
        count: 3,
        foo: 'bar',
      });
    });

    it('throws a rejection if the file path does not exist', async () => {
      expect.assertions(1);

      const filePath = join(__dirname, '../../fixtures/this/does/no/exist.json');
      const subject = new JsonMocker({ filePath });

      await expect(subject.get()).rejects.toThrowError();
    });
  });
});
