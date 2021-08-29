import { HttpSymbol } from './httpSymbol.js';

export interface HttpRegionParserResultValid {
  endRegionLine?: number;
  nextParserLine: number,
  symbols?: Array<HttpSymbol>
}
export type HttpRegionParserResult = HttpRegionParserResultValid | false;
