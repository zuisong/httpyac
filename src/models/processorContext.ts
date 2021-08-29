import { ConsoleLogHandler, RequestLogger } from './logHandler.js';
import { HttpClient } from './httpClient.js';
import { HttpFile } from './httpFile.js';
import { HttpRegion, ProcessedHttpRegion } from './httpRegion.js';
import { HttpRequest } from './httpRequest.js';
import { RepeatOptions } from './repeatOptions.js';
import { Variables } from './variables.js';
import { EnvironmentConfig } from './environmentConfig.js';


export type Dispose = () => void;

export interface Progress{
  isCanceled: () => boolean;
  register: (event: (() => void)) => Dispose;
  report?: (value: { message?: string, increment?: number }) => void;
}

export interface HttpFileSendContext{
  httpFile: HttpFile;
  config?: EnvironmentConfig,
  progress?: Progress;
  httpClient?: HttpClient;
  httpRegionPredicate?: (obj: HttpRegion) => boolean;
  processedHttpRegions?: Array<ProcessedHttpRegion>;
  scriptConsole?: ConsoleLogHandler;
  logResponse?: RequestLogger;
  repeat?: RepeatOptions;
  require?: Record<string, unknown>,
}

export interface HttpRegionsSendContext extends HttpFileSendContext{
  httpRegions: HttpRegion[];
}

export interface HttpRegionSendContext extends HttpFileSendContext{
  httpRegion: HttpRegion;
}
export interface ProcessorContext extends HttpRegionSendContext{
  httpClient: HttpClient;
  variables: Variables;
  request?: HttpRequest;
  showProgressBar?: boolean;
}


export type SendContext = HttpRegionSendContext | HttpFileSendContext | HttpRegionsSendContext;
