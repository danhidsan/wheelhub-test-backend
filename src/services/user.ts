import { sqliteDataSource } from '../db';
import { User } from '../entity/User';

export type UserPayload = {
  user: string;
  password: string;
  hint: string;
}

export const createUser = async (user: UserPayload) => {
  const userRepository = sqliteDataSource.getRepository(User);
  const newUser = userRepository.create(user);
  const result = await userRepository.save(newUser);

  return result;
};