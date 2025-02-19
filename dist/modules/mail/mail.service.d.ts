export declare class EmailService {
    private transporter;
    private auth;
    constructor();
    sendMail(to: string, subject: string, text: string): Promise<void>;
}
