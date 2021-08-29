import { OpenIdInformation, requestOpenIdInformation } from './openIdInformation.js';
import { toQueryParams } from '../../../utils/index.js';
import { HttpClient, ProcessorContext } from '../../../models/index.js';

class RefreshTokenFlow {

  private isTokenExpired(time: number, expiresIn: number, timeSkew: number) {
    return time + 1000 * (expiresIn - timeSkew) < (new Date()).getTime();
  }

  async perform(openIdInformation: OpenIdInformation, options: {httpClient: HttpClient }, context?: ProcessorContext): Promise<OpenIdInformation | false> {
    if (!this.isTokenExpired(openIdInformation.time, openIdInformation.expiresIn, openIdInformation.timeSkew)) {
      return openIdInformation;
    }
    if (openIdInformation.refreshToken
      && openIdInformation.refreshExpiresIn
      && !this.isTokenExpired(openIdInformation.time, openIdInformation.refreshExpiresIn, openIdInformation.timeSkew)) {

      return requestOpenIdInformation({
        url: openIdInformation.config.tokenEndpoint,
        method: 'POST',
        body: toQueryParams({
          grant_type: 'refresh_token',
          refresh_token: openIdInformation.refreshToken
        })
      }, {
        httpClient: options.httpClient,
        config: openIdInformation.config,
        id: openIdInformation.id,
        title: openIdInformation.title,
        description: openIdInformation.description,
      }, context);
    }
    return false;
  }
}

export const refreshTokenFlow = new RefreshTokenFlow();
