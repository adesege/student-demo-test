import { BadRequestException, PayloadTooLargeException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';

export const transformClassToPlain = data => {
  return classToPlain(data);
};

export const mutlerConfigOptions = {
  fileFilter(req, file, cb) {
    const photoMimeTypes = [
      'image/png',
      'image/jpg',
      'image/gif',
      'image/jpeg',
    ];
    const fieldName = file.fieldname;
    if (fieldName === 'photo' && !photoMimeTypes.includes(file.mimetype)) {
      return cb(
        new BadRequestException(
          `Mime type for ${fieldName} must be one of "${JSON.stringify(
            photoMimeTypes,
          )}"`,
        ),
      );
    }

    // 10000000 bytes equals 10MB
    if (file.size > 10000000) {
      return cb(new PayloadTooLargeException(`${fieldName} is too large`));
    }
    return cb(null, true);
  },
};

export const getPublicId = url => {
  return url.match(/(?=(\w+)\.\w{3,4}$).+/)[1];
};
