import { Request, ResponseToolkit } from 'hapi';
import { factory as mockerFactory, MockerFactoryFunction } from './mockers/factory';

interface HandlerOptions {
  factory?: MockerFactoryFunction;
  path: string;
}

export function handler({ factory = mockerFactory, path }: HandlerOptions) {
  return async (req: Request, h: ResponseToolkit) => {
    const mocker = await factory({ method: req.method, path });
    const mock = await mocker.get({ req, h });

    return mock;
  };
}
