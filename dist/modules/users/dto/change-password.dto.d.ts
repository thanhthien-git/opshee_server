import { FindOperator } from "typeorm";
export declare class ChangePasswordDto {
    userId: number | FindOperator<number>;
    newPassword: string;
}
