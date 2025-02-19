import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
export declare class UsersService {
    private userRepository;
    getUserById(id: number): Promise<{
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
    updateInfo(data: UpdateInfoDto): Promise<{
        message: string;
    }>;
    changePassword(data: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
