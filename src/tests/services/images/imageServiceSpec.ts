import path from 'path';
import appConfig from '../../../appConfig';
import ApplicationError from '../../../Erorrs/ApplicationError';
import imageService from '../../../services/Images/imageService';

describe(`Test imageService.processImage`, () => {
  const name = 'fjord'; // image name
  const height = '300';
  const width = '200';
  const validPath = path.join(appConfig.thumbDir, `${name}_${width}_${height}.jpg`);
  it('Should resize an image and return valid path', async () => {
    const result = await imageService.processImage({ name, height, width } as object);
    expect(result).toEqual(validPath);
  });

  it('Should fail when I pass not existing image name', async () => {
    const newName = 'fake Name';
    await expectAsync(
      imageService.processImage({
        name: newName,
        height,
        width,
      } as object)
    ).toBeRejectedWith(
      ApplicationError.badRequest([
        `File name (${newName}) is not exists, Make sure you type the name correctly and that you are not merging the extension with it`,
      ])
    );
  });

  it('Should fail if I merge the image extension with name like [fjord.jpg]', async () => {
    const newName = name + '.jpg';
    await expectAsync(
      imageService.processImage({
        name: newName,
        height,
        width,
      } as object)
    ).toBeRejectedWith(
      ApplicationError.badRequest([
        `File name (${newName}) is not exists, Make sure you type the name correctly and that you are not merging the extension with it`,
      ])
    );
  });

  it('Should fail without [name] param', async () => {
    await expectAsync(
      imageService.processImage({
        height,
        width,
      } as object)
    ).toBeRejectedWith(ApplicationError.badRequest(['"name" is required']));
  });

  it('Should fail without [height] param', async () => {
    await expectAsync(
      imageService.processImage({
        name,
        width,
      } as object)
    ).toBeRejectedWith(ApplicationError.badRequest(['"height" is required']));
  });

  it('Should fail without [width] param', async () => {
    await expectAsync(
      imageService.processImage({
        name,
        height,
      } as object)
    ).toBeRejectedWith(ApplicationError.badRequest(['"width" is required']));
  });

  it('Should fail with [height] less than 1', async () => {
    await expectAsync(
      imageService.processImage({
        name,
        height: -1,
        width,
      } as object)
    ).toBeRejectedWith(ApplicationError.badRequest(['"height" must be greater than or equal to 1']));
  });

  it('Should fail with [height] grater than 5000', async () => {
    await expectAsync(
      imageService.processImage({
        name,
        height: 5001,
        width,
      } as object)
    ).toBeRejectedWith(ApplicationError.badRequest(['"height" must be less than or equal to 5000']));
  });

  it('Should fail with [width] less than 1', async () => {
    await expectAsync(
      imageService.processImage({
        name,
        width: -1,
        height,
      } as object)
    ).toBeRejectedWith(ApplicationError.badRequest(['"width" must be greater than or equal to 1']));
  });

  it('Should fail with [width] grater than 5000', async () => {
    await expectAsync(
      imageService.processImage({
        name,
        width: 5001,
        height,
      } as object)
    ).toBeRejectedWith(ApplicationError.badRequest(['"width" must be less than or equal to 5000']));
  });
});
