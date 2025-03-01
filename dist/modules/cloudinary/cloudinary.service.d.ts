export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<string>;
    uploadFiles(files: Array<Express.Multer.File>): Promise<string[]>;
}
