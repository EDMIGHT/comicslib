import { Response } from 'express';

export class CustomResponse {
  static ok(response: Response, data: any): Response {
    return response.status(200).send(data);
  }
  static created(response: Response, data: any): Response {
    return response.status(201).send(data);
  }
  static badRequest(response: Response, data: any): Response {
    return response.status(400).send(data);
  }
  static notFound(response: Response, data: any): Response {
    return response.status(404).send(data);
  }
  static conflict(response: Response, data: any): Response {
    return response.status(409).send(data);
  }
  static serverError(response: Response, data: any): Response {
    return response.status(500).send(data);
  }
  static unauthorized(response: Response, data: any): Response {
    return response.status(401).send(data);
  }
  static forbidden(response: Response, data: any): Response {
    return response.status(403).send(data);
  }
}
