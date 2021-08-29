import { ReplaceVariableHook } from '../../models/index.js';
import { awsAuthVariableReplacer } from './awsAuthVariableReplacer.js';
import { basicAuthVariableReplacer } from './basicAuthVariableReplacer.js';
import { clientCertVariableReplacer } from './clientCertVariableReplacer.js';
import { digestAuthVariableReplacer } from './digestAuthVariableReplacer.js';
import { escapeVariableReplacer } from './escapeVariableReplacer.js';
import { hostVariableReplacer } from './hostVariableReplacer.js';
import { intellijVariableReplacer } from './intellijVariableReplacer.js';
import { javascriptVariableReplacer } from './javascriptVariableReplacer.js';
import { openIdVariableReplacer } from './openIdVariableReplacer.js';
import { restClientVariableReplacer } from './restClientVariableReplacer.js';
import { showInputBoxVariableReplacer } from './showInputBoxVariableReplacer.js';
import { showQuickpickVariableReplacer } from './showQuickpickVariableReplacer.js';


export enum VariableReplacerType{
  aws = 'aws',
  basicAuth = 'basicAuth',
  clientCertificate = 'clientCertificate',
  digestAuth = 'digestAuth',
  escape = 'escape',
  oauth2 = 'oauth2',
  host = 'host',
  intellijDynamic = 'intellijDynamic',
  restClientDynamic = 'restClientDynamic',
  javascript = 'javascript',
  showInputBox = 'showInputBox',
  showQuickPick = 'showQuickPick'
}

export function initReplaceVariableHook(): ReplaceVariableHook {
  const hook = new ReplaceVariableHook();

  hook.addHook(VariableReplacerType.showInputBox, showInputBoxVariableReplacer);
  hook.addHook(VariableReplacerType.showQuickPick, showQuickpickVariableReplacer);
  hook.addHook(VariableReplacerType.restClientDynamic, restClientVariableReplacer);
  hook.addHook(VariableReplacerType.intellijDynamic, intellijVariableReplacer);
  hook.addHook(VariableReplacerType.javascript, javascriptVariableReplacer);
  hook.addHook(VariableReplacerType.host, hostVariableReplacer);
  hook.addHook(VariableReplacerType.oauth2, openIdVariableReplacer);
  hook.addHook(VariableReplacerType.aws, awsAuthVariableReplacer);
  hook.addHook(VariableReplacerType.clientCertificate, clientCertVariableReplacer);
  hook.addHook(VariableReplacerType.basicAuth, basicAuthVariableReplacer);
  hook.addHook(VariableReplacerType.digestAuth, digestAuthVariableReplacer);
  hook.addHook(VariableReplacerType.escape, escapeVariableReplacer);

  return hook;
}
