import { Server, ServerRegisterPluginObject } from 'hapi';
import { isEmpty } from 'lodash';

import { plugin } from './plugins';

interface CreateServerOptions {
  cors: {
    additionalHeaders: string[];
  };

  plugins?: Array<ServerRegisterPluginObject<any>>;

  port: number | string;
}

export async function createServer({ cors, plugins, port }: CreateServerOptions): Promise<Server> {
  const server = new Server({
    port,
    routes: {
      cors: {
        additionalHeaders: normalizeCorsAdditionalHeaders(cors.additionalHeaders),
        credentials: true,
        origin: ['*'],
      },
    },
  });

  const pluginToRegister = plugins || (await plugin(server));

  await server.register(pluginToRegister);

  return server;
}

function normalizeCorsAdditionalHeaders(headers: string[]) {
  if (headers.some(isEmpty)) {
    return [];
  }

  return headers;
}
