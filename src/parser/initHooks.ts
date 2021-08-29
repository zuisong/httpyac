import * as models from '../models/index.js';

import { parseComment } from './commentHttpRegionParser.js';
import { parseGraphql } from './gqlHttpRegionParser.js';
import { parseIntellijScript } from './intellijHttpRegionParser.js';
import { parseJavascript } from './javascriptHttpRegionParser.js';
import { parseMetaData } from './metaHttpRegionParser.js';
import { parseRequestBody, closeRequestBody } from './requestBodyHttpRegionParser.js';
import { parseRequestLine } from './requestHttpRegionParser.js';
import { parseResponse, closeResponseBody } from './responseHttpRegionParser.js';
import { parseResponseRef } from './responseRefHttpRegionParser.js';
import { parseVariable } from './variableHttpRegionParser.js';

import { injectOnEveryRequestJavascript } from './javascriptHttpRegionParser.js';
import { injectNote } from './noteMetaHttpRegionParser.js';


export enum ParserId {
  meta = 'meta',
  comment = 'comment',
  variable = 'variable',
  javascript = 'javascript',
  note = 'note',
  intellijScript = 'intellijScript',
  gql = 'gql',
  request = 'request',
  responseRef = 'responseRef',
  response = 'response',
  requestBody = 'requestBody'
}

export function initParseHook(): models.ParseHook {
  const hook = new models.ParseHook();

  hook.addHook(ParserId.meta, parseMetaData);
  hook.addHook(ParserId.comment, parseComment);
  hook.addHook(ParserId.variable, parseVariable);
  hook.addHook(ParserId.javascript, parseJavascript);
  hook.addHook(ParserId.intellijScript, parseIntellijScript);
  hook.addHook(ParserId.gql, parseGraphql);
  hook.addHook(ParserId.request, parseRequestLine);
  hook.addHook(ParserId.responseRef, parseResponseRef);
  hook.addHook(ParserId.response, parseResponse);
  hook.addHook(ParserId.requestBody, parseRequestBody);

  return hook;
}


export function initParseEndHook(): models.ParseEndRegionHook {
  const hook = new models.ParseEndRegionHook();

  hook.addHook(ParserId.javascript, injectOnEveryRequestJavascript);
  hook.addHook(ParserId.note, injectNote);
  hook.addHook(ParserId.response, closeResponseBody);
  hook.addHook(ParserId.requestBody, closeRequestBody);

  return hook;
}
