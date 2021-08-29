import { HttpFileSendContext } from '../models/index.js';

export type CliContext = Omit<HttpFileSendContext, 'httpFile'>;
