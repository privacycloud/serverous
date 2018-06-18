import { Server, ServerAuth } from 'hapi';
import { Security, Spec } from 'swagger-schema-official';

import { OpenApi } from '../../../src/entities/OpenApi';
import { AuthStrategies } from '../../../src/generators/AuthStrategies';

describe('AuthStrategies', () => {
  describe('#generate', () => {
    it('does not register any authentication strategy if there are not any security definitions', () => {
      const openApi = new OpenApi({} as Spec);

      const scheme = jest.fn();
      const strategy = jest.fn();
      const server = { auth: { scheme, strategy } as Partial<ServerAuth> } as Server;

      const subject = new AuthStrategies({ server, openApi });

      subject.generate();

      expect(scheme).not.toHaveBeenCalled();
      expect(strategy).not.toHaveBeenCalled();
    });

    it('registers one authentication strategy by security definition', () => {
      const spec = {
        securityDefinitions: {
          foo: { type: 'foo' } as Security,
          jwt: { type: 'jwt' } as Security,
        },
      } as Partial<Spec>;

      const openApi = new OpenApi(spec as Spec);

      const scheme = jest.fn();
      const strategy = jest.fn();
      const server = { auth: { scheme, strategy } as Partial<ServerAuth> } as Server;

      const subject = new AuthStrategies({ server, openApi });
      subject.generate();

      expect(scheme).toHaveBeenCalledTimes(2);
      expect(scheme).toHaveBeenCalledWith('foo', expect.any(Function));
      expect(scheme).toHaveBeenCalledWith('jwt', expect.any(Function));
      expect(strategy).toHaveBeenCalledTimes(2);
      expect(strategy).toHaveBeenCalledWith('foo', 'foo', {});
      expect(strategy).toHaveBeenCalledWith('jwt', 'jwt', {});
    });
  });
});
