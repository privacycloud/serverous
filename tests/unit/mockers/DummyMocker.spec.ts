import { DummyMocker } from '../../../src/mockers/DummyMocker';

describe('DummyMocker', () => {
  describe('#get', () => {
    it('returns a empty object', async () => {
      const subject = new DummyMocker();

      const mock = await subject.get();

      expect(mock).toEqual({});
    });
  });
});
