import { StorageService } from './storage.service';
export declare class StorageController {
    private readonly storageService;
    constructor(storageService: StorageService);
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        message: string;
    }>;
    getConfig(): Promise<any>;
    updateConfig(config: any): Promise<any>;
}
