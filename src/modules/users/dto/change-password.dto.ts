import { FindOperator } from "typeorm";

export class ChangePasswordDto {
  userId: number | FindOperator<number>;
  newPassword: string;
}
