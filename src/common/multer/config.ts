import { diskStorage } from 'multer';
import { extname, parse } from 'path';
import * as fs from 'fs';

// export const storageConfig = (folder: string) =>
//   diskStorage({
//     destination: `./uploads/${folder}`,
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   });

// export const multerOptions = (folder: string) => ({
//   storage: diskStorage({
//     destination: `./uploads/${folder}`,
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     },
//   }),
//   fileFilter: (req, file, cb) => {
//     const ext = extname(file.originalname);
//     const alloedExArr = ['.jpg', '.jpeg', '.png', '.gif'];
//     if (!alloedExArr.includes(ext)) {
//       req.fileValidationError = `Only images are allowed: ${alloedExArr.toString()}`;
//       cb(null, false);
//     } else {
//       const fileSize = parseInt(req.headers['content-length'] as string);
//       if (fileSize > 1024 * 1024 * 5) {
//         req.fileValidationError = 'File size cannot be more than 5MB';
//         cb(null, false);
//       } else {
//         cb(null, true);
//       }
//     }
//   },
// });

// import { diskStorage } from 'multer';
// import { extname } from 'path';
import { promises as fsPromises } from 'fs';

export const multerOptions = (folder: string) => ({
  storage: diskStorage({
    destination: async (req, file, cb) => {
      const uploadFolder = `./uploads/${folder}`;

      try {
        // Kiểm tra xem thư mục đã tồn tại chưa, nếu chưa thì tạo mới
        await fsPromises.mkdir(uploadFolder, { recursive: true });
        cb(null, uploadFolder);
      } catch (error) {
        console.error(`Error creating upload folder: ${error.message}`);
        cb(error, null);
      }
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const ext = extname(file.originalname);
    const allowedExArr = ['.jpg', '.jpeg', '.png', '.gif'];

    if (!allowedExArr.includes(ext)) {
      req.fileValidationError = `Only images are allowed: ${allowedExArr.toString()}`;
      cb(null, false);
    } else {
      const fileSize = parseInt(req.headers['content-length'] as string);
      if (fileSize > 1024 * 1024 * 5) {
        req.fileValidationError = 'File size cannot be more than 5MB';
        cb(null, false);
      } else {
        cb(null, true);
      }
    }
  },
});


export const removeFile = (filePath: string): void => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File ${filePath} deleted successfully.`);
    } else {
      console.log(`File ${filePath} not found.`);
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error.message);
    throw error;
  }
};
