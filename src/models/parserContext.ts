import { HttpFileStore } from '../store/index.js';
import { HttpFile } from './httpFile.js';
import { HttpRegion } from './httpRegion.js';
import { ParserContextData } from './parserContextData.js';


export type HttpLineGenerator = Generator<{ textLine: string; line: number; }, void, unknown>;

export type getHttpLineGenerator = (noStopOnMetaTag?: boolean) => HttpLineGenerator;


export interface ParserContext{
  lines: Array<string>;
  httpRegion: HttpRegion;
  httpFile: HttpFile;
  data: ParserContextData;
  httpFileStore: HttpFileStore;
}
