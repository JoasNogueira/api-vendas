import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  password: string;
  email: string;
  avatar: string;
}

class CreateProductService {
  public async execute({ name, password, email }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const UserExists = await usersRepository.findByEmail(email);

    if (UserExists) {
      throw new AppError('Email address already used.');
    }

    const user = usersRepository.create({
      name,
      password,
      email,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateProductService;
