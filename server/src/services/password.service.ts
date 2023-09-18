import bcrypt from 'bcryptjs';

export class PasswordService {
  public static async compare(
    currentPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(currentPassword, hashedPassword);
  }
  public static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
