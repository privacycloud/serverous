import HapiOpenApi from 'hapi-openapi';

import { Server } from 'hapi';

import { OpenApi } from '../entities/OpenApi';
import { AuthStrategies } from '../generators/AuthStrategies';

const { OPEN_API_SPEC } = process.env;

export async function mount(server: Server): Promise<void> {
  if (!OPEN_API_SPEC) {
    throw new Error('OPEN_API_SPEC is null or it does not exist');
  }

  const openApi = await OpenApi.load(OPEN_API_SPEC);

  new AuthStrategies({ server, openApi }).generate();

  return server.register({
    options: {
      api: openApi.getSpec(),
      cors: true,
      handlers: openApi.toHandlers(),
    },
    plugin: HapiOpenApi,
  });
}
