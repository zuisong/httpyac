import { HttpRequest } from './httpRequest.js';
import { HttpResponse } from './httpResponse.js';
import { HttpClientContext } from './httpClientContext.js';


export type HttpClient = (request: HttpRequest, context: HttpClientContext) => Promise<HttpResponse | false>;
