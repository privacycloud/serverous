import { PathDefinition } from '../../../src/entities/PathDefinition';

describe('PathDefinition', () => {
  describe('#name', () => {
    it('does not have an initial slash on any case', () => {
      const subject = new PathDefinition({ name: '/foo/1/bar', path: {} });

      expect(subject.name).toEqual('foo/1/bar');
    });

    it('does not perform any change if the name did not start with slash', () => {
      const subject = new PathDefinition({ name: 'foo/5/bar', path: {} });

      expect(subject.name).toEqual('foo/5/bar');
    });
  });

  describe('#methods', () => {
    it('returns the defined methods by the path', () => {
      const subject = new PathDefinition({ name: '', path: { get: undefined, post: undefined } });

      expect(subject.methods).toEqual(expect.arrayContaining(['get', 'post']));
    });

    it('returns an empty array if there is not any defined method', () => {
      const subject = new PathDefinition({ name: '', path: {} });

      expect(subject.methods).toHaveLength(0);
    });
  });
});
