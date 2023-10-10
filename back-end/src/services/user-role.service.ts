import AppDataSource from '../db/app-data-source';
import { UserRole } from '../entities/user-role.entity';

const userRoleRepository = AppDataSource.getRepository(UserRole);

// To find user role by name
const findUserRoleByName = async (name: string): Promise<UserRole | null> => {
  const userRole = await userRoleRepository.findOneBy({ name: name });
  return userRole;
};

export { findUserRoleByName };
