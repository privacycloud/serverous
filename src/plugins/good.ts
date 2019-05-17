import Good from 'good';
import { ServerRegisterPluginObject } from 'hapi';

export async function plugin(): Promise<ServerRegisterPluginObject<any>> {
  return {
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
  };
}
