import { UserRole } from "src/common/enums/user-role.enum";
import { Districts } from "src/entity/districts.entity";
import { Wards } from "src/entity/wards.entity";

export class UpdateUserDto {
    name: string;
    birth: Date;
    email: string;
    phone: string;
    role: UserRole;
    ward: Wards;
    district: Districts;
}