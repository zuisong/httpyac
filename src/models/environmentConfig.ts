import { ClientCertificateOptions } from './clientCertifcateOptions.js';
import { HttpyacHooksApi } from './httpHooksApi.js';
import { HttpRequest } from './httpRequest.js';
import { LogLevel } from './logHandler.js';
import { Variables } from './variables.js';

export interface EnvironmentConfig{
  cookieJarEnabled?: boolean;
  log?: {

    /** log level of outputs */
    level?: LogLevel,

    /** enable ansi color support */
    supportAnsiColors?: boolean,
  }

  request?: HttpRequest;
  proxy?: string;
  requestBodyInjectVariablesExtensions?: Array<string>;
  clientCertificates?: Record<string, ClientCertificateOptions>,
  /** default request headers if not overwritten */
  defaultHeaders?: Record<string, string>,

  /** environment variables  */
  environments?: Record<string, Variables>;
  /** relative or absoulte path to env dir */
  envDirName?: string;
  /** hookApi for extending httpyac */
  configureHooks?: ConfigureHooks;
  /** configuration for plugins */
  plugins?: Record<string, unknown>
}

export type ConfigureHooks = (api: HttpyacHooksApi) => void | Promise<void>;
