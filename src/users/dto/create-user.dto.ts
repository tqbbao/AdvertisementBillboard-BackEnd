import { UserRole } from "src/common/enums/user-role.enum";
import { Districts } from "src/entity/districts.entity";
import { Wards } from "src/entity/wards.entity";

export class CreateUserDto {
    name: string;
    birth: Date;
    email: string;
    phone: string;
    username: string;
    password: string;
    role: UserRole;
    ward: Wards;
    district: Districts;
    
}