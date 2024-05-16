import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

const fileMulterConfig = {
  storage: diskStorage({
    destination: process.env.UPLOADED_FILES_DESTINATION,
    filename: (req, file, callback) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4(); // The regex removes white spaces

      const extension = path.parse(file.originalname).ext;
      callback(null, `${fileName}${extension}`);
    },
  }),
};

export default fileMulterConfig;
