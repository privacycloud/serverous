import { Security, Spec } from 'swagger-schema-official';

import { OpenApi } from '../../../src/entities/OpenApi';

describe('OpenApi', () => {
  describe('#forEachSecurityDefinition', () => {
    let spy: any;

    beforeEach(() => {
      spy = jest.fn();
    });

    it('does not call the callback if there are not any security definitions', () => {
      const subject = new OpenApi({} as Spec);

      subject.forEachSecurityDefinition(spy);

      expect(spy).not.toHaveBeenCalled();
    });

    it('calls the callback on every security definition', () => {
      const spec = {
        securityDefinitions: {
          foo: { type: 'foo' } as Security,
          jwt: { type: 'jwt' } as Security,
        },
      } as Partial<Spec>;

      const subject = new OpenApi(spec as Spec);
      subject.forEachSecurityDefinition(spy);

      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
