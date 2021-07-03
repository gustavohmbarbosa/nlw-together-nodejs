import { Request, Response } from "express";
import { ListComplimentsSentByUserService } from "../services/ListComplimentsSentByUserService";

class ListComplimentsSentByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.auth;
    const listComplimentsSentByUserService =
      new ListComplimentsSentByUserService();

    const compliments = await listComplimentsSentByUserService.execute(id);

    return response.json(compliments);
  }
}

export { ListComplimentsSentByUserController };
