import { EnvironmentConfig } from './environmentConfig.js';
import { HttpFile } from './httpFile.js';

export interface VariableProviderContext{
  httpFile: HttpFile;
  config?: EnvironmentConfig,
}
