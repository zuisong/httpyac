import { PathLike } from './pathLike.js';

export interface ClientCertificateOptions{
  cert?: PathLike;
  key?: PathLike;
  pfx?: PathLike;
  passphrase?: string;
}
