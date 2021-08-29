import { VariableProviderContext, Variables } from '../../models/index.js';
import { toEnvironmentKey } from '../../utils/index.js';

export async function httpFileVariableProvider(env: string[] | undefined, context: VariableProviderContext) : Promise<Variables> {
  const envkey = toEnvironmentKey(env);
  if (!context.httpFile.variablesPerEnv[envkey]) {
    context.httpFile.variablesPerEnv[envkey] = {};
  }
  return context.httpFile.variablesPerEnv[envkey];
}
