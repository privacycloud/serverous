import axios from 'axios';

import { Security, Spec } from 'swagger-schema-official';

import { Handlers } from '../generators/Handlers';
import { PathDefinition } from './PathDefinition';

export class OpenApi {
  public static async load(path: string) {
    const response = await axios.get<Spec>(path);
    const spec = response.data;

    return new OpenApi(spec);
  }

  private spec: Spec;

  constructor(spec: Spec) {
    this.spec = spec;
  }

  public forEachSecurityDefinition(cb: (name: string, security: Security) => any): void {
    if (!this.spec.securityDefinitions) {
      return;
    }

    Object.entries(this.spec.securityDefinitions).forEach(([name, security]) => {
      cb(name, security);
    });
  }

  public getSpec(): Spec {
    return this.spec;
  }

  public toHandlers(): any {
    return new Handlers({
      paths: PathDefinition.fromSpecPaths(this.spec.paths),
    }).generate();
  }
}
