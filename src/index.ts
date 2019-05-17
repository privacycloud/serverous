import { createServer } from './server';

const { CORS_ADDITIONAL_HEADERS = '', PORT = 3000 } = process.env;

(async () => {
  try {
    const server = await createServer({
      cors: {
        additionalHeaders: CORS_ADDITIONAL_HEADERS.split(','),
      },
      port: PORT,
    });

    await server.start();

    console.log(`Server is running @ ${server.info.uri}`);
  } catch (error) {
    console.log(error);
  }
})();
