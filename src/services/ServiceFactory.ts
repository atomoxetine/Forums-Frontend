import HTTPClient from "../libs/HTTPClient";

class ServiceFactory {
  private readonly client: HTTPClient;

  constructor(uri: string) {
    this.client = new HTTPClient(uri);
  }
}