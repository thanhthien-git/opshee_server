export declare const CONFIG_DATABASE: {
    load_env: Promise<import("@nestjs/common").DynamicModule>;
};
export declare const CONFIG: {
    cloudinary: {
        cloudName: string;
        apiKey: string;
        apiSecret: string;
    };
    database: {
        postgres: string;
        mongo: string;
    };
    nodeMailer: {
        email: string;
        password: string;
    };
    redis: {
        url: string;
        ttl: string;
    };
    jwt: string;
};
