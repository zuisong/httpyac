import { ProcessorContext, Progress } from '../../../models/index.js';
import { OpenIdConfiguration } from './openIdConfiguration.js';
import { OpenIdInformation } from './openIdInformation.js';


export interface OpenIdFlowContext{
  progress?: Progress | undefined,
  cacheKey: string,
}

export interface OpenIdFlow{
  supportsFlow(flow: string): boolean;
  getCacheKey(config: OpenIdConfiguration): string | false;
  perform(config: OpenIdConfiguration, options: OpenIdFlowContext, context: ProcessorContext): Promise<OpenIdInformation | false>
}
