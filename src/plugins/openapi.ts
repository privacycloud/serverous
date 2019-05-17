import HapiOpenApi from 'hapi-openapi';

import { Server, ServerRegisterPluginObject } from 'hapi';

import { OpenApi } from '../entities/OpenApi';
import { AuthStrategies } from '../generators/AuthStrategies';

const { OPEN_API_SPEC } = process.env;

export async function plugin(server: Server): Promise<ServerRegisterPluginObject<any>> {
  if (!OPEN_API_SPEC) {
    throw new Error('OPEN_API_SPEC is null or it does not exist');
  }

  const openApi = await OpenApi.load(OPEN_API_SPEC);

  new AuthStrategies({ server, openApi }).generate();

  return {
    options: {
      api: openApi.getSpec(),
      cors: true,
      handlers: openApi.toHandlers(),
    },
    plugin: HapiOpenApi,
  };
}
