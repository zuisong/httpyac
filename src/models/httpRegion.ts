import { ExecuteHook } from './httpFileHooks.js';
import { HttpRequest } from './httpRequest.js';
import { HttpResponse } from './httpResponse.js';
import { HttpSymbol } from './httpSymbol.js';
import { TestResult } from './testResult.js';

export interface ProcessedHttpRegion{
  request?: HttpRequest;
  response?: HttpResponse;
  requestLine?: number;
  symbol: HttpSymbol;
  metaData: Record<string, string | undefined>;
  testResults?: Array<TestResult>;
  responseRefs?: Array<string>;
}

export interface HttpRegion extends ProcessedHttpRegion{
  hooks: {
    execute: ExecuteHook;
  }
}
