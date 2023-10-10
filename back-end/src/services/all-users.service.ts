import { AllUsers } from '../entities/all-users.entity';
import AppDataSource from '../db/app-data-source';

const allUsersRepository = AppDataSource.getRepository(AllUsers);

// To create users
const createAllUser = async (input: Partial<AllUsers>): Promise<AllUsers> => {
  return await allUsersRepository.save(allUsersRepository.create(input));
};

// To find all users by email
const findAllUserByEmail = async (email: string): Promise<AllUsers | null> => {
  return await allUsersRepository.findOneBy({ email: email });
};

// To find all users by id
const findAllUserById = async (userId: string): Promise<AllUsers | null> => {
  return await allUsersRepository.findOneBy({ id: userId });
};

export { createAllUser, findAllUserByEmail, findAllUserById };
