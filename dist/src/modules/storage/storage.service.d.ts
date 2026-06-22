export declare class StorageService {
    uploadFile(file: Express.Multer.File): Promise<string>;
    deleteFile(filename: string): Promise<void>;
    private readonly configPath;
    getStorageConfig(): Promise<any>;
    updateStorageConfig(config: any): Promise<any>;
}
