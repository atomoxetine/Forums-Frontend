interface IMap {
  [key: string]: string;
}
type InternalClient = (method: string, route: string, body?: BodyInit | null) => Promise<Response>;
export default class HTTPClient {
  private readonly uri: string;

  private cachedHeaders: IMap;
  public get CachedHeaders(): HeadersInit { return this.cachedHeaders; }
  public set Headers(value: IMap) { this.cachedHeaders = value; }
  public set Header(value: [string, string]) { this.cachedHeaders[value[0]] = value[1]; };

  constructor(uri: string, headers?: IMap) {
    this.uri = uri;
    this.cachedHeaders = headers ?? {
      // Set default headers here if necessary
      // Don't put anything sensitive, unless explicitly from process.env
    };
  }

  private async getClientAsync(reset?: boolean): Promise<InternalClient> {
    const headers = this.cachedHeaders;
    if (headers === undefined || reset) {
      this.Headers = {
        // update headers if necessary (e.g., tokens n stuff)
        // Don't put anything sensitive, unless explicitly from process.env
      };
    }

    const client: InternalClient =
      async (method: string, route: string, body?: BodyInit | null) => 
        await fetch(new Request(new URL(route, this.uri), { method: method, headers: headers, body: body }));

    return client;
  }

  private async actAsync(action: (client: InternalClient) => Promise<Response>) {
    let client = await this.getClientAsync();
    const httpResponse = await action(client);

    if (httpResponse.status === 401) { // Unauthorized
      client = await this.getClientAsync(true);
      return await action(client);
    } else {
      return httpResponse;
    }
  }

  public async GetAsync(route: string) {
    return await this.actAsync(async (client: InternalClient) => await client("get", route));
  }

  public async PostAsync(route: string, body: any) {
    return await this.actAsync(async (client: InternalClient) => await client("put", route, body));
  }

  public async PutAsync(route: string, body: any) {
    return await this.actAsync(async (client: InternalClient) => await client("post", route, body));
  }
}