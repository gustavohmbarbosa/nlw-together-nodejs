import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      select: ["id", "name", "email", "password", "admin"],
      where: { email },
    });
    if (!user) {
      throw new Error("Email Or Password incorrect");
    }

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email Or Password incorrect");
    }

    delete user.password;
    const token = sign({ auth: user }, "82a9bd140c4ece1bcfd076dffddfcd75", {
      subject: user.id,
      expiresIn: "1d",
    });

    return token;
  }
}

export { AuthenticateUserService };
