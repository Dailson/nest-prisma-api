import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import fileMulterConfig from '../config/file-multer.config';

// @FileInterceptor: Extract file from request. It must match the name of the property field('file') in the @ApiBody. Otherwise, Nest return 400
// applyDecorator: Encapsulates mutitple decorators related to the same feature
export function FileUpload(...mimeTypes: string[]) {
  return applyDecorators(
    UseInterceptors(FileInterceptor('file', fileMulterConfig)), // 'file' is the field name used on upload
    ApiConsumes(...mimeTypes), // Say to swagger that the endpoit is cosuming multipart/form-data
    ApiBody({
      // enable upload on swagger
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    }),
  );
}
