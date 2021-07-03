import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

import { classToPlain } from "class-transformer";

class ListComplimentsReceivedByUserService {
  async execute(user_id: string) {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.findOne({
      where: { user_receiver: user_id },
      relations: ["sender", "receiver", "tag"],
    });

    return classToPlain(compliments);
  }
}

export { ListComplimentsReceivedByUserService };
