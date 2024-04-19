import bcrypt from "bcrypt";

class BcryptUtils {
  static async hash(str: string) {
    return await bcrypt.hash(str, 10);
  }

  static async compare(str: string, hash: string) {
    return await bcrypt.compare(str, hash);
  }
}

export default BcryptUtils;
