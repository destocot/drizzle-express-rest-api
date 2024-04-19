import type { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

export type JwtPayload = Pick<DefaultJwtPayload, "iat" | "exp"> & {
  /* Add custom fields here */
  sub: string;
};
