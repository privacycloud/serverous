import Good from 'good';

import { Server } from 'hapi';

export function mount(server: Server): Promise<void> {
  return server.register({
    options: {
      ops: {
        interval: 1000,
      },
      reporters: {
        console: [
          {
            args: [{ log: '*', error: '*', request: '*', response: '*' }],
            module: 'good-squeeze',
            name: 'Squeeze',
          },
          {
            module: 'good-console',
          },
          'stdout',
        ],
      },
    },
    plugin: Good,
  });
}
