import { Request, ResponseToolkit, Server, ServerAuthScheme } from 'hapi';

import { OpenApi } from '../entities/OpenApi';
import { Generator } from './Generator';

export class AuthStrategies implements Generator {
  private server: Server;
  private openApi: OpenApi;

  constructor({ server, openApi }: { server: Server; openApi: OpenApi }) {
    this.openApi = openApi;
    this.server = server;
  }

  public generate() {
    this.openApi.forEachSecurityDefinition((name, security) => {
      this.server.auth.scheme(security.type, this.scheme());
      this.server.auth.strategy(name, security.type, {});
    });
  }

  public scheme(): ServerAuthScheme {
    return () => {
      return {
        authenticate(_: Request, h: ResponseToolkit) {
          return h.authenticated({ credentials: {} });
        },
      };
    };
  }
}
