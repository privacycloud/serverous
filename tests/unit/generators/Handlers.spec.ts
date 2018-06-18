import { Path } from 'swagger-schema-official';

import { PathDefinition } from '../../../src/entities/PathDefinition';
import { Handlers } from '../../../src/generators/Handlers';

describe('Handlers', () => {
  describe('#generate', () => {
    const paths = PathDefinition.fromSpecPaths({
      '/countries/notifications': {
        post: {},
      } as Path,
      '/countries/{id}/players': {
        get: {},
        post: {},
      } as Path,
      '/players/{id}': {
        put: {},
      } as Path,
      '/teams/{id}/size': {
        get: {},
      } as Path,
    });

    let subject: Handlers;

    beforeEach(() => {
      subject = new Handlers({ paths });
    });

    it('returns an object with only keys for the top level resources', () => {
      const handlers = subject.generate();

      expect(Object.keys(handlers)).toHaveLength(3);

      expect(Object.keys(handlers)).toEqual(expect.arrayContaining(['teams', 'countries', 'players']));
    });

    it('creates nested keys for every subpath', () => {
      const handlers = subject.generate();

      expect(handlers.teams['{id}'].size).toBeDefined();
      expect(handlers.countries['{id}'].players).toBeDefined();
      expect(handlers.countries.notifications).toBeDefined();
      expect(handlers.players['{id}']).toBeDefined();
    });

    it('creates a function for every HTTP method within a path', () => {
      const handlers = subject.generate();

      expect(handlers.teams['{id}'].size.get).toEqual(expect.any(Function));
      expect(handlers.countries['{id}'].players.get).toEqual(expect.any(Function));
      expect(handlers.countries['{id}'].players.post).toEqual(expect.any(Function));
      expect(handlers.countries.notifications.post).toEqual(expect.any(Function));
      expect(handlers.players['{id}'].put).toEqual(expect.any(Function));
    });
  });
});
