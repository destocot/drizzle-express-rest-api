import jwt from "jsonwebtoken";
import config from "@/lib/config";

class JwtUtils {
  static sign(payload: string | object | Buffer) {
    return jwt.sign(payload, config.JWT_SECRET, {
      expiresIn: "5m",
    });
  }

  static verify(token: string) {
    return jwt.verify(token, config.JWT_SECRET);
  }
}

export default JwtUtils;
