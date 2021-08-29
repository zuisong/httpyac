import { ActionType, HttpRegionAction, ProcessorContext } from '../models/index.js';
import lodash from 'lodash';

export class CreateRequestAction implements HttpRegionAction {
  id = ActionType.request;
  before = Object.keys(ActionType);

  async process(context: ProcessorContext) : Promise<boolean> {
    if (context.httpRegion.request) {
      context.request = lodash.cloneDeep(context.httpRegion.request);
    }
    return true;
  }
}
