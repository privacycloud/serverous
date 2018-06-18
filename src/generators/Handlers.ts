import { merge, set } from 'lodash';

import { PathDefinition } from '../entities/PathDefinition';
import { handler as handlerFactory } from '../handler';

interface HandlersOptions {
  paths: PathDefinition[];
}

export class Handlers {
  private paths: PathDefinition[];

  constructor(options: HandlersOptions) {
    this.paths = options.paths;
  }

  public generate(): any {
    return this.paths.reduce((handlers: any, definition) => {
      const handler = this.buildHandler(definition);

      return merge(handlers, handler);
    }, {});
  }

  public buildHandler(definition: PathDefinition) {
    const objectPath = definition.name.split('/').join('.');

    const methods = definition.methods.reduce((obj: any, method) => {
      obj[method] = handlerFactory({ path: definition.name });

      return obj;
    }, {});

    return set({}, objectPath, { ...methods });
  }
}
