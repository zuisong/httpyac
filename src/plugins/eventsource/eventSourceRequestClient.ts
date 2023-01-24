import { log } from '../../io';
import * as models from '../../models';
import * as utils from '../../utils';
import { isEventSourceRequest, EventSourceRequest } from './eventSourceRequest';
import EventSource from 'eventsource';

export class EventSourceRequestClient extends models.AbstractRequestClient<EventSource> {
  private client: EventSource | undefined;
  private responseTemplate: Partial<models.HttpResponse> & { protocol: string } = {
    protocol: 'SSE',
  };

  constructor(private readonly request: models.Request) {
    super();
  }
  get reportMessage(): string {
    return `perform SSE Request (${this.request.url})`;
  }

  get nativeClient(): EventSource {
    if (!this.client) {
      if (isEventSourceRequest(this.request)) {
        this.client = new EventSource(this.request.url || '', this.getClientOptions(this.request));
        this.registerEvents(this.client, this.request);
      } else {
        throw new Error('no valid Request received');
      }
    }
    return this.client;
  }

  async connect(): Promise<models.HttpResponse | undefined> {
    const client = this.nativeClient;
    log.debug(client);
    return undefined;
  }

  async send(): Promise<models.HttpResponse | undefined> {
    return undefined;
  }

  override close(): void {
    this.removeAllListeners();
    this.nativeClient?.close();
  }

  private getClientOptions(request: EventSourceRequest): EventSource.EventSourceInitDict {
    const options: EventSource.EventSourceInitDict = {};
    const headers = { ...request.headers };
    utils.deleteHeader(headers, 'event');
    options.headers = headers;

    if (request.noRejectUnauthorized) {
      options.rejectUnauthorized = false;
    }
    if (request.proxy) {
      options.proxy = request.proxy;
    }
    return options;
  }

  private registerEvents(client: EventSource, request: EventSourceRequest) {
    const events = utils.getHeaderArray(request.headers, 'event', ['data']);

    for (const event of events) {
      client.addEventListener(event, message => {
        this.onMessage('message', {
          ...this.responseTemplate,
          statusCode: message.status || 200,
          name: `EventSource (${this.request.url})`,
          message: message.data,
          body: {
            data: message.data,
            date: new Date(),
          },
        });
      });
    }
    client.onerror = err => {
      this.onMessage('error', {
        ...this.responseTemplate,
        statusCode: 400,
        body: utils.toString(err),
      });
    };

    const metaDataEvents = ['open'];
    for (const event of metaDataEvents) {
      client.addEventListener(event, message => {
        this.onMetaData('open', {
          ...this.responseTemplate,
          statusCode: 200,
          message: message.data,
          body: {
            data: message.data,
            date: new Date(),
          },
        });
      });
    }
  }
}