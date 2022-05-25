import path from 'path';
import sharp from 'sharp';
import ApplicationError from '../../Erorrs/ApplicationError';
import validationSchema from './validationSchema';
import { promises as fsPromises, constants } from 'fs';
import appConfig from '../../appConfig';

const imageDir = appConfig.imgDir;
const thumbDir = appConfig.thumbDir;

class ImageService {
  /** resize image and return resized image path
   * @throws ApplicationError in case invalid parameters
   */
  async processImage(params: Partial<IImageInfo>): Promise<string> {
    const info: IImageInfo = await this.validate(params);

    const thumbFullName = this.generateThumbPath(info);

    // check if thumb already exists return it
    if (await this.isFileExists(thumbFullName)) {
      return thumbFullName;
    }

    // create and resize new thumb then return it
    await sharp(this.getRealImagePath(info)).resize(info.width, info.height).toFile(thumbFullName);
    return thumbFullName;
  }

  /**   validate object and return it with right dataTypes or throw exception if unvalid */
  private async validate(params: Partial<IImageInfo>): Promise<IImageInfo> {
    const { error, value } = validationSchema.validate(params, { abortEarly: false });
    if (error) {
      throw ApplicationError.badRequestJoi(error);
    }

    // check if the image name already exists in the original images folder
    if (!(await this.isFileExists(this.getRealImagePath(value as IImageInfo)))) {
      throw ApplicationError.badRequest([
        `File name (${value.name}) is not exists, Make sure you type the name correctly and that you are not merging the extension with it`,
      ]);
    }
    return value as IImageInfo;
  }

  /** get thumb full path (for example dirPath + imgName_width_height.jpg) -> assets/thumbs/encenadaport_50_50.jpg */
  private generateThumbPath(info: IImageInfo) {
    return path.join(thumbDir, `${info.name}_${info.width}_${info.height}.jpg`);
  }

  /** get original image full path (for example dirPath + imgName.jpg) -> assets/images/encenadaport.jpg */
  private getRealImagePath(info: IImageInfo) {
    return path.join(imageDir, `${info.name}.jpg`);
  }

  /** check if fiele exists in specific path */
  private async isFileExists(filePath: string): Promise<boolean> {
    try {
      await fsPromises.access(filePath, constants.F_OK);
      return true;
    } catch {
      return false;
    }
  }
}

export default new ImageService();
