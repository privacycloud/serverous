import { Server } from 'hapi';

import { mount as mountPlugins } from './plugins';

const { PORT = 3000 } = process.env;

(async () => {
  try {
    const server = new Server({ port: PORT });

    await mountPlugins(server);

    await server.start();

    console.log(`Server is running @ ${server.info.uri}`);
  } catch (error) {
    console.log(error);
  }
})();
