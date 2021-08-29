import { EnvironmentConfig } from './environmentConfig.js';
import { FileProvider } from './fileProvider.js';
import { HookCancel } from './hook.js';
import { HttpFile } from './httpFile.js';
import { HttpFileHooks } from './httpFileHooks.js';
import { LogHandler } from './logHandler.js';
import { PathLike } from './pathLike.js';
import { SessionStore } from './sessionStore.js';
import { UserInteractonProvider } from './userInteractonProvider.js';

export interface HttpyacHooksApi{
  readonly version: string;
  readonly rootDir?: PathLike;
  readonly httpFile: Readonly<HttpFile>;
  readonly config: EnvironmentConfig;
  readonly hooks: HttpFileHooks;
  readonly log: LogHandler;
  readonly fileProvider: FileProvider,
  readonly sessionStore: SessionStore,
  readonly userInteractionProvider: UserInteractonProvider;
  getHookCancel(): typeof HookCancel;
}
