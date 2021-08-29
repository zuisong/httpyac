import { ParserContext } from '../models/index.js';
import { getDisplayName } from '../utils/index.js';
import { userInteractionProvider } from '../io/index.js';
import { ParserId } from './initHooks.js';

export async function injectNote({ httpRegion }: ParserContext): Promise<void> {
  if (httpRegion.metaData.note) {
    const note = httpRegion.metaData.note || `Are you sure you want to send the request ${getDisplayName(httpRegion)}?`;

    httpRegion.hooks.execute.addHook(ParserId.note, () => userInteractionProvider.showNote(note), {
      before: Object.keys(ParserId),
    });
  }
}
