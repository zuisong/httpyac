import { OpenIdConfiguration, assertConfiguration } from './openIdConfiguration.js';
import { OpenIdInformation, requestOpenIdInformation } from './openIdInformation.js';
import { OpenIdFlow, OpenIdFlowContext } from './openIdFlow.js';
import { toQueryParams } from '../../../utils/index.js';
import { ProcessorContext } from '../../../models/index.js';

class ClientCredentialsFlow implements OpenIdFlow {
  supportsFlow(flow: string): boolean {
    return ['client_credentials', 'client'].indexOf(flow) >= 0;
  }

  getCacheKey(config: OpenIdConfiguration) {
    if (assertConfiguration(config, ['tokenEndpoint', 'clientId', 'clientSecret'])) {
      return `client_credentials_${config.clientId}_${config.tokenEndpoint}`;
    }
    return false;
  }


  async perform(config: OpenIdConfiguration, options: OpenIdFlowContext, context: ProcessorContext): Promise<OpenIdInformation | false> {
    return requestOpenIdInformation({
      url: config.tokenEndpoint,
      method: 'POST',
      body: toQueryParams({
        grant_type: 'client_credentials',
        scope: config.scope,
      })
    }, {
      httpClient: context.httpClient,
      config,
      id: options.cacheKey,
      title: `clientCredentials: ${config.clientId}`,
      description: `${config.variablePrefix} - ${config.tokenEndpoint}`,
    }, context);
  }
}

export const clientCredentialsFlow = new ClientCredentialsFlow();
