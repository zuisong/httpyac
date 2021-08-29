import { PathLike } from './pathLike.js';
import { HttpFileStore } from '../store/index.js';
import { EnvironmentConfig } from './environmentConfig.js';


export interface ParseOptions {
  httpFileStore: HttpFileStore,
  config?: EnvironmentConfig,
  workingDir?: PathLike,
  activeEnvironment?: string[] | undefined,
}
