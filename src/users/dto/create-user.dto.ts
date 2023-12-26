import { IsEmail, IsEnum, IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { UserRole } from "src/common/enums/user-role.enum";
import { Districts } from "src/entity/districts.entity";
import { Wards } from "src/entity/wards.entity";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    birth: Date;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    phone: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsEnum(UserRole, { message: 'Invalid role value (WARD_MANAGER/DISTRICT_MANAGER/DEPARTMENT_MANAGER)' })
    role: UserRole;

    ward: Wards;
    
    district: Districts;
}