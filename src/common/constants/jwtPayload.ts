import { UserRole } from "../enums/user-role.enum";

export type JwtPayload = {
    username: string;
    sub: number;
    role: UserRole;
    districtId: number;
    wardId: number;
};
  