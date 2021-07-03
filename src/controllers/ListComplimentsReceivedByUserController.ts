import { Request, Response } from "express";
import { ListComplimentsReceivedByUserService } from "../services/ListComplimentsReceivedByUserService";

class ListComplimentsReceivedByUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.auth;
    const listComplimentsReceivedByUserService =
      new ListComplimentsReceivedByUserService();

    const compliments = await listComplimentsReceivedByUserService.execute(id);

    return response.json(compliments);
  }
}

export { ListComplimentsReceivedByUserController };
