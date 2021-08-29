import { Progress } from './processorContext.js';
import { RepeatOptions } from './repeatOptions.js';

export interface HttpClientContext{
  progress?: Progress | undefined,
  showProgressBar?: boolean;
  repeat?: RepeatOptions
}
