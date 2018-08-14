import { Server } from 'hapi';

import { mount as mountPlugins } from './plugins';

const { CORS_ADDITIONAL_HEADERS = '', PORT = 3000 } = process.env;

(async () => {
  try {
    const server = new Server({
      port: PORT,
      routes: {
        cors: {
          additionalHeaders: CORS_ADDITIONAL_HEADERS.split(','),
          credentials: true,
          origin: ['*'],
        },
      },
    });

    await mountPlugins(server);

    await server.start();

    console.log(`Server is running @ ${server.info.uri}`);
  } catch (error) {
    console.log(error);
  }
})();
