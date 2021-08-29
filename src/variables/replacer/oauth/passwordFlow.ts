import { OpenIdConfiguration, assertConfiguration } from './openIdConfiguration.js';
import { OpenIdInformation, requestOpenIdInformation } from './openIdInformation.js';
import { OpenIdFlow, OpenIdFlowContext } from './openIdFlow.js';
import { toQueryParams } from '../../../utils/index.js';
import { ProcessorContext } from '../../../models/index.js';

class PasswordFlow implements OpenIdFlow {
  supportsFlow(flow: string): boolean {
    return ['password'].indexOf(flow) >= 0;
  }

  getCacheKey(config: OpenIdConfiguration) {
    if (assertConfiguration(config, ['tokenEndpoint', 'clientId', 'clientSecret', 'username', 'password'])) {
      return `password_${config.clientId}_${config.username}_${config.tokenEndpoint}`;
    }
    return false;
  }

  async perform(config: OpenIdConfiguration, options: OpenIdFlowContext, context: ProcessorContext): Promise<OpenIdInformation | false> {
    return requestOpenIdInformation({
      url: config.tokenEndpoint,
      method: 'POST',
      body: toQueryParams({
        grant_type: 'password',
        scope: config.scope,
        username: config.username,
        password: config.password,
      })
    }, {
      httpClient: context.httpClient,
      config,
      id: options.cacheKey,
      title: `PasswordFlow: ${config.username} (${config.clientId})`,
      description: `${config.variablePrefix} - ${config.tokenEndpoint}`,
    }, context);
  }
}


export const passwordFlow = new PasswordFlow();
