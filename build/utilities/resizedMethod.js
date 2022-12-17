"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const resizeImage = (imageLocation, fileName, newFileName, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, sharp_1.default)(imageLocation)
        .resize({
        width: width,
        height: height,
        fit: 'contain',
        position: 'center'
    }).toFile(newFileName).then(() => {
        if (newFileName.includes(fileName)) {
            fs_1.promises.rename(path_1.default.resolve('./') + `/${newFileName}`, path_1.default.resolve('./') + `/assets/resizedImage/${newFileName}`);
            return true;
        }
        else {
            return false;
        }
    }).catch((err) => {
        return false;
    });
});
// function resizeImage(imageLocation: string, newFileName: string, width: number, height: number): string {
//     try {
//         // first check if the directory already exists
//         if (!existsSync(path.resolve('./') + `/assets/resizedImage`)) {
//             mkdirSync(path.resolve('./') + `/assets/resizedImage`);
//             sharp(imageLocation).resize({
//                 width: width,
//                 height: height,
//                 fit: 'contain',
//                 position: 'center'
//             })
//                 .toFile(newFileName)
//                 .then(() => {
//                     fsPromises.rename(path.resolve('./') + `/${newFileName}`, path.resolve('./') + `/assets/resizedImage/${newFileName}`);
//                     // const newImgLocation = path.resolve('./') + `/assets/resizedImage/${newFileName}`;
//                     // const newImgLocation = `/assets/resizedImage/${newFileName}`;
//                     // return newImgLocation;
//                     // res.sendFile(newImgLocation);
//                     return newFileName;
//                 });
//         }
//         else {
//             const filesNameList = readdirSync(path.resolve('./') + `/assets/resizedImage`);
//             // console.log(newFileName);
//             // console.log(filesNameList.includes(newFileName));
//             if (filesNameList.includes(newFileName)) {
//                 // const currentImageLocation = path.resolve('./') + `/assets/resizedImage/${newFileName}`;
//                 // const currentImageLocation = `/assets/resizedImage/${newFileName}`;
//                 // return currentImageLocation;
//                 // res.sendFile(path.resolve('./') + `/assets/resizedImage/${newFileName}`);
//                 return newFileName;
//             }
//             else {
//                 sharp(imageLocation).resize({
//                     width: width,
//                     height: height,
//                     fit: 'contain',
//                     position: 'center'
//                 })
//                     .toFile(newFileName)
//                     .then(() => {
//                         fsPromises.rename(path.resolve('./') + `/${newFileName}`, path.resolve('./') + `/assets/resizedImage/${newFileName}`);
//                         // const newImgLocation = path.resolve('./') + `/assets/resizedImage/${newFileName}`;
//                         // const newImgLocation = `/assets/resizedImage/${newFileName}`;
//                         // return newImgLocation;
//                         // res.sendFile(newImgLocation);
//                         return newFileName;
//                     });
//             }
//         }
//         return "Oops!! Something went wrong!";
//     }
//     catch (err) {
//         return `${err}`;
//     }
// }
exports.default = resizeImage;
