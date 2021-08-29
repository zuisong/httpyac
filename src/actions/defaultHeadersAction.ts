import { ActionType, HttpRegionAction, ProcessorContext } from '../models/index.js';
import lodash from 'lodash';

export class DefaultHeadersAction implements HttpRegionAction {
  id = ActionType.defaultHeaders;

  constructor(private readonly data: string) {}

  async process({ request, variables }: ProcessorContext) : Promise<boolean> {
    if (request && this.data && variables) {
      const headers = lodash.get(variables, this.data);
      request.headers = Object.assign(headers, request.headers);
    }
    return true;
  }
}
