import { ScriptData } from '../actions/index.js';
import { RequestBodyImport } from './httpRequest.js';
import { HttpSymbol } from './httpSymbol.js';


export interface ParserEveryRequestScript {
  scriptData: ScriptData,
  postScript: boolean
}

export interface ParserRequestBody{
  rawBody: Array<string | RequestBodyImport>;
  symbol?: HttpSymbol;
}


export interface ParserContextData {
  metaTitle?: string;
  request_body?: ParserRequestBody,
  httpResponseSymbol?: {
    symbol: HttpSymbol,
    body: Array<string>,
  },
  gql?: Record<string, string>,
  jsOnEveryRequest?: ParserEveryRequestScript[],
  readonly [key: string]: unknown;
}
