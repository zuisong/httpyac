import { PathLike } from './pathLike.js';
import { HttpRegion } from './httpRegion.js';
import { HttpFileHooks } from './httpFileHooks.js';
import { Variables } from './variables.js';
import { EnvironmentConfig } from './environmentConfig.js';

export interface HttpFile{
  fileName: PathLike;
  readonly rootDir?: PathLike;
  readonly hooks: HttpFileHooks,
  readonly httpRegions: Array<HttpRegion>;
  config?: EnvironmentConfig;
  variablesPerEnv: Record<string, Variables>;
  activeEnvironment?: string[];
}
