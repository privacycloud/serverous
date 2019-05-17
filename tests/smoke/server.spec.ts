import { createServer } from '../../src/server';

describe('#createServer', () => {
  it('creates a server that can be started without errors ', async () => {
    const server = await createServer({
      cors: {
        additionalHeaders: [''], // See http://github.com/privacycloud/serverous/issues/3
      },
      plugins: [],
      port: 3000,
    });

    await server.start();

    await server.stop();
  });
});
