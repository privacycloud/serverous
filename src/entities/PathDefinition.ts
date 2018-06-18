import { METHODS } from 'http';
import { has, invokeMap } from 'lodash';
import { Path } from 'swagger-schema-official';

interface PathDefinitionOptions {
  name: string;
  path: Path;
}

export class PathDefinition {
  public static fromSpecPaths(paths: { [pathName: string]: Path }): PathDefinition[] {
    return Object.entries(paths).map(([name, path]) => new PathDefinition({ name, path }));
  }

  private _name: string;
  private path: Path;

  constructor(options: PathDefinitionOptions) {
    this._name = options.name;
    this.path = options.path;
  }

  public get methods() {
    return invokeMap(METHODS, String.prototype.toLocaleLowerCase).filter((method) => has(this.path, method));
  }

  public get name() {
    return this._name.startsWith('/') ? this._name.slice(1) : this._name;
  }
}
