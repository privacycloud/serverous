import { Server } from 'hapi';

import { mount as mountGood } from './good';
import { mount as mountOpenApi } from './openapi';

export async function mount(server: Server) {
  mountGood(server);
  mountOpenApi(server);
}
