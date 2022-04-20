import { validate, ValidationError } from 'class-validator';

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
  
  const errors = await validate(newUser);
  if (errors.length > 0) throw new ValidationError();
  
  const result = await userRepository.save(newUser);

  return result;
};