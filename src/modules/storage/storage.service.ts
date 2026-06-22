import { BadRequestException, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class StorageService {
  /**
   * For Phase 1 & 2, we store files locally in /uploads.
   * Later, this method will be replaced to upload to S3/Firebase Storage.
   */
  async uploadFile(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Return the relative URL so the frontend can access it via the static file server
    const fileUrl = `/uploads/${file.filename}`;
    return fileUrl;
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  private readonly configPath = path.join(process.cwd(), 'uploads', 'storage-config.json');

  async getStorageConfig() {
    try {
      if (fs.existsSync(this.configPath)) {
        const data = fs.readFileSync(this.configPath, 'utf8');
        return JSON.parse(data);
      }
    } catch (e) {
      // return default
    }
    return {
      provider: 'local',
      bucketName: '',
      region: '',
      accessKeyId: '',
      secretAccessKey: '',
    };
  }

  async updateStorageConfig(config: any) {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf8');
    return config;
  }
}
