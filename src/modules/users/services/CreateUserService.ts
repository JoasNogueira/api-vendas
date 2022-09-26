import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, password, email }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const UserExists = await usersRepository.findByEmail(email);

    if (UserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPssword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPssword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
