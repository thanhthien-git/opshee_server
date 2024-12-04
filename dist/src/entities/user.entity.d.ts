export declare class UserEntity {
    user_id?: number;
    user_name: string;
    user_first_name: string;
    user_last_name: string;
    user_phone: string;
    user_email?: string;
    user_password: string;
    user_create_at?: Date;
    user_update_at?: Date;
    user_address?: object;
    date_of_birth?: Date;
    isDeleted?: boolean;
    isBanned?: boolean;
    role?: string;
}
