import UserRepository from "../repositories/user.repository";
import { getPermissionsForRole } from "../constants/permissions.constant";

export default class UserService {
  /**
   * Get user by ID
   */
  static async getUser(id: string) {
    const user = await UserRepository.findById(id);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    const { password: _password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      permissions: getPermissionsForRole(user.role),
    };
  }

  /**
   * List users
   */
  static async listUsers(page?: number, limit?: number) {
    const result = await UserRepository.findAll(page, limit);
    return {
      ...result,
      users: result.users.map((u: any) => ({
        ...u,
        permissions: getPermissionsForRole(u.role),
      })),
    };
  }
}
