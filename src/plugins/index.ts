import { Server, ServerRegisterPluginObject } from 'hapi';

import { plugin as good } from './good';
import { plugin as openapi } from './openapi';

export async function plugin(server: Server): Promise<Array<ServerRegisterPluginObject<any>>> {
  return [await good(), await openapi(server)];
}
