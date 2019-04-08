import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { ConfigService } from '../../config/services/config.service';
import { IUploaderResult } from './interfaces';

@Injectable()
export class AssetManagerService {
  protected assetManager;
  constructor(protected configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });

    this.assetManager = cloudinary.v2;
  }

  // tslint:disable-next-line: no-any
  upload(file): Promise<IUploaderResult> {
    return new Promise((resolve, reject) => {
      return this.assetManager.uploader
        .upload_stream((error, result: IUploaderResult) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        })
        .end(file);
    });
  }

  delete(publicId: string) {
    return new Promise((resolve, reject) => {
      return this.assetManager.api.delete_resources(
        [publicId],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        },
      );
    });
  }
}
