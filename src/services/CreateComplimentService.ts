import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { TagRepository } from "../repositories/TagRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: IComplimentRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const userRepository = getCustomRepository(UserRepository);
    const tagRepository = getCustomRepository(TagRepository);

    if (user_sender === user_receiver) {
      throw new Error("You cannot send a compliment to yourself");
    }

    const userReceiverExist = await userRepository.findOne(user_receiver);
    if (!userReceiverExist) {
      throw new Error("User Receiver does not exist");
    }

    const tagReceiverExist = await tagRepository.findOne(tag_id);
    if (!tagReceiverExist) {
      throw new Error("Tag informed does not exist");
    }

    const compliment = complimentRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
