import { Variables } from '../../models/index.js';
import { toEnvironmentKey } from '../../utils/index.js';

export const intellijVariableCache: Record<string, Variables> = {};


export async function provideIntellijGlobalVariables(env: string[] | undefined): Promise<Variables> {
  const envkey = toEnvironmentKey(env);
  if (!intellijVariableCache[envkey]) {
    intellijVariableCache[envkey] = {};
  }
  return intellijVariableCache[envkey];
}
