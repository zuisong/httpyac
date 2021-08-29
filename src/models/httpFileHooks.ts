import { BailSeriesHook, WaterfallHook, SeriesHook } from './hook.js';
import { HttpRegionParserResult } from './httpRegionParserResult.js';
import { HttpRequest } from './httpRequest.js';
import { HttpResponse } from './httpResponse.js';
import { getHttpLineGenerator, ParserContext } from './parserContext.js';
import { ProcessorContext } from './processorContext.js';
import { VariableProviderContext } from './variableProviderContext.js';
import { Variables } from './variables.js';

export interface HttpFileHooks{
  readonly parse: ParseHook,
  readonly parseEndRegion: ParseEndRegionHook,
  readonly replaceVariable: ReplaceVariableHook;
  readonly provideEnvironments: ProvideEnvironmentsHook;
  readonly provideVariables: ProvideVariablesHook;


  readonly beforeRequest: BeforeRequestHook;
  readonly afterRequest: AfterRequestHook,
  readonly responseLogging: ResponseLoggingHook,
}

export class ParseHook extends BailSeriesHook<getHttpLineGenerator,
  HttpRegionParserResult,
  false,
  ParserContext
> {
  constructor() {
    super(obj => !!obj);
    this.id = 'ParseHook';
  }
}

export class ParseEndRegionHook extends SeriesHook<ParserContext, void> {
  constructor() {
    super();
    this.id = 'ParseEndRegionHook';
  }
}
export class ProvideVariablesHook extends SeriesHook<string[] | undefined, Variables, string, VariableProviderContext> {
  constructor() {
    super();
    this.id = 'ProvideVariablesHook';
  }
}
export class ProvideEnvironmentsHook extends SeriesHook<VariableProviderContext, string[], string> {
  constructor() {
    super();
    this.id = 'ProvideEnvironmentsHook';
  }
}
export class ReplaceVariableHook extends WaterfallHook<string, undefined, string, ProcessorContext> {
  constructor() {
    super(obj => obj === undefined);
    this.id = 'ReplaceVariableHook';
  }
}
export class BeforeRequestHook extends SeriesHook<HttpRequest, void, HttpRequest, ProcessorContext> {
  constructor() {
    super();
    this.id = 'BeforeRequestHook';
  }
}
export class AfterRequestHook extends SeriesHook<HttpResponse, void, HttpResponse, ProcessorContext> {
  constructor() {
    super();
    this.id = 'AfterRequestHook';
  }
}
export class ResponseLoggingHook extends BailSeriesHook<HttpResponse, void, HttpResponse, ProcessorContext> {
  constructor() {
    super();
    this.id = 'ResponseLoggingHook';
  }
}
export class ExecuteHook extends SeriesHook<ProcessorContext, boolean> {
  constructor() {
    super(obj => !obj);
    this.id = 'ExecuteHook';
  }
}
