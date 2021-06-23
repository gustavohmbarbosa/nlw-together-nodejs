import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";

class CreateTagService {
  async execute(name: string) {
    const tagRepository = getCustomRepository(TagRepository);

    if (!name) {
      throw new Error("Name is required");
    }

    const tagAlreadyExists = await tagRepository.findOne({ name });

    if (tagAlreadyExists) {
      throw new Error("Tag already exists");
    }

    const tag = await tagRepository.create({ name });

    await tagRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
