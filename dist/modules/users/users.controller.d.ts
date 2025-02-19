import { UsersService } from './users.service';
import { UpdateInfoDto } from './dto/update-info.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getById(req: any): Promise<{
        user_id?: number;
        user_name: string;
        user_first_name: string;
        user_last_name: string;
        user_phone: string;
        user_email?: string;
        user_create_at?: Date;
        user_update_at?: Date;
        user_address?: object;
        date_of_birth?: Date;
        role?: string;
        verification_code?: string;
        verification_code_exp?: Date;
    }>;
    changePassword(req: any, newPassword: string): Promise<{
        message: string;
    }>;
    updateUser(req: any, data: UpdateInfoDto): Promise<{
        message: string;
    }>;
}
