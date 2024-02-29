interface IMap {
  [key: string]: string;
}
type InternalClient = (method: string, route: string, body?: BodyInit) => Promise<Response>;
export default class HTTPClient {
  private readonly uri: string;

  private cachedHeaders: IMap;
  public get CachedHeaders(): HeadersInit { return this.cachedHeaders; }
  public set NewHeaders(value: IMap) { this.cachedHeaders = {...this.cachedHeaders, ...value}; }
  public set Header(value: [string, string]) { this.cachedHeaders[value[0]] = value[1]; };

  constructor(uri: string, headers?: IMap) {
    this.uri = uri;
    this.cachedHeaders = headers ?? {
      // Set default headers here if necessary
      "content-type": "application/json",
      "Authorization": process.env.API_KEY!,
    };
  }

  private async getClientAsync(reset?: boolean): Promise<InternalClient> {
    const headers = this.cachedHeaders;
    if (headers === undefined || reset) {
      this.NewHeaders = {
        // update headers if necessary (e.g., tokens n stuff)
        // Don't put anything sensitive, unless explicitly from process.env
      };
    }

    const client: InternalClient =
      async (method: string, route: string, body?: BodyInit) => 
        await fetch(
          new Request(
            new URL(route, this.uri),
            { method: method, headers: headers, body: body ? JSON.stringify(body) : undefined }
          )
        );

    return client;
  }

  private async actAsyncInternal(mode: string, route: string, body?: any): Promise<Response> {
    const action = async (client: InternalClient) => await client(mode, route, body);

    let client = await this.getClientAsync();
    const httpResponse = await action(client);

    if (httpResponse.status === 401) { // Unauthorized
      client = await this.getClientAsync(true);
      return await action(client);
    } else {
      return httpResponse;
    }
  }

  private async actAsync<T = any>(mode: string, route: string, body?: any): Promise<[T | null, number, string | null]> {
    const httpResponse = await this.actAsyncInternal(mode, route, body);
    let json;
    try {
      json = await httpResponse.json();
    } catch (err) {
      const message = "Error parsing response json: " + err;
      console.log(message);
      return [null, 500, message];
    }
    if (!httpResponse.ok)
      return [null, httpResponse.status, json.message];
    
    return [json as T, httpResponse.status, null];
  }

  public GetAsync = async <T = any>(route: string, body?: any): Promise<[T | null, number, string | null]> =>
    await this.actAsync<T>("get", route, body);

  public PostAsync = async <T = any>(route: string, body?: any): Promise<[T | null, number, string | null]> =>
    await this.actAsync<T>("post", route, body);

  public PutAsync = async <T = any>(route: string, body?: any): Promise<[T | null, number, string | null]> =>
    await this.actAsync<T>("put", route, body);

  public DeleteAsync = async <T = any>(route: string, body?: any): Promise<[T | null, number, string | null]> =>
    await this.actAsync<T>("delete", route, body);
}
