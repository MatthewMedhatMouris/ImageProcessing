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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const imagesData_1 = __importDefault(require("../../utilities/imagesData"));
const fs_1 = require("fs");
const resizedMethod_1 = __importDefault(require("../../utilities/resizedMethod"));
const images = express_1.default.Router();
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileName = req.query.fileName;
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const imgLocation = path_1.default.resolve('./') + `/assets/${fileName}.jpg`;
    const image = imagesData_1.default.includes(fileName);
    const newFileName = `${fileName + '_' + width + '_' + height}.jpg`;
    if (fileName === undefined) {
        return res.status(400).send('Bad request, query parameter (fileName) is required.');
    }
    if (image === false) {
        return res.status(404).send('Resource not found, this image does not exist!');
    }
    if ((0, fs_1.existsSync)(imgLocation) === false) {
        return res.status(404).send('Resource not found, this image does not have a photo!');
    }
    if (width === undefined) {
        return res.status(400).send('Bad request, query parameter (width) is required.');
    }
    if (isNaN(width)) {
        return res.status(400).send('Width must be a number!');
    }
    if (height === undefined) {
        return res.status(400).send('Bad request, query parameter (height) is required.');
    }
    if (isNaN(height)) {
        return res.status(400).send('Height must be a number!');
    }
    try {
        // first check if the directory already exists
        if (!(0, fs_1.existsSync)(path_1.default.resolve('./') + `/assets/resizedImage`)) {
            (0, fs_1.mkdirSync)(path_1.default.resolve('./') + `/assets/resizedImage`);
            if (yield (0, resizedMethod_1.default)(imgLocation, fileName, newFileName, width, height)) {
                const resizedImagePath = path_1.default.resolve('./') + `/assets/resizedImage/` + newFileName;
                res.sendFile(resizedImagePath);
            }
            else {
                return res.status(400).send('Oops!! Something went wrong!');
            }
            // const resizedImagePath = path.resolve('./') + `/assets/resizedImage/`+ newFileName;
            // res.sendFile(resizedImagePath);
        }
        else {
            const filesNameList = (0, fs_1.readdirSync)(path_1.default.resolve('./') + `/assets/resizedImage`);
            if (filesNameList.includes(newFileName)) {
                // console.log(path.resolve('./') + `/assets/resizedImage/${newFileName}`);
                res.sendFile(path_1.default.resolve('./') + `/assets/resizedImage/${newFileName}`);
            }
            else {
                if (yield (0, resizedMethod_1.default)(imgLocation, fileName, newFileName, width, height)) {
                    const resizedImagePath = path_1.default.resolve('./') + `/assets/resizedImage/` + newFileName;
                    res.sendFile(resizedImagePath);
                }
                else {
                    return res.status(400).send('Oops!! Something went wrong!');
                }
                // await resizeImage(imgLocation,newFileName,width,height);
                // const resizedImagePath = path.resolve('./') + `/assets/resizedImage/`+ newFileName;
                // res.sendFile(resizedImagePath);
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    // const resizedImagePath = path.resolve('./') + `/assets/resizedImage/`+ resizeImage(imgLocation,newFileName,width,height);
    // console.log(resizeImage(imgLocation,newFileName,width,height));
    // console.log(resizedImagePath + resizeImage(imgLocation,newFileName,width,height));
    // res.sendFile(resizedImagePath + resizeImage(imgLocation,newFileName,width,height));
    // try {
    //     // first check if the directory already exists
    //     if (!existsSync(path.resolve('./') + `/assets/resizedImage`)) {
    //         mkdirSync(path.resolve('./') + `/assets/resizedImage`);
    //         sharp(imgLocation).resize({
    //             width: width,
    //             height: height,
    //             fit: 'contain',
    //             position: 'center'
    //         })
    //         .toFile(newFileName)
    //         .then(() => {
    //             fsPromises.rename(path.resolve('./') + `/${newFileName}`, path.resolve('./') + `/assets/resizedImage/${newFileName}`);
    //             const newImgLocation = path.resolve('./') + `/assets/resizedImage/${newFileName}`;
    //             console.log(newImgLocation);
    //             res.sendFile(newImgLocation);
    //         });
    //     } else {
    //         const filesNameList = readdirSync(path.resolve('./') + `/assets/resizedImage`);
    //         if (filesNameList.includes(newFileName)) {
    //             console.log(path.resolve('./') + `/assets/resizedImage/${newFileName}`);
    //             res.sendFile(path.resolve('./') + `/assets/resizedImage/${newFileName}`);
    //         }
    //         else{
    //             sharp(imgLocation).resize({
    //                 width: width,
    //                 height: height,
    //                 fit: 'contain',
    //                 position: 'center'
    //             })
    //             .toFile(newFileName)
    //             .then(() => {
    //                 fsPromises.rename(path.resolve('./') + `/${newFileName}`, path.resolve('./') + `/assets/resizedImage/${newFileName}`);
    //                 const newImgLocation = path.resolve('./') + `/assets/resizedImage/${newFileName}`;
    //                 console.log(newImgLocation);
    //                 res.sendFile(newImgLocation);
    //             });
    //         }
    //     }
    // }
    // catch (err) {
    //     console.log(err)
    // }
    // sharp(imgLocation).resize({
    //     width: width,
    //     height: height,
    //     fit: 'contain',
    //     position: 'center'
    // })
    // .toFile(fileName + (width as unknown as string) + (height as unknown as string) + '.jpg')
    // .then(() => {
    //     fsPromises.rename(path.resolve('./') + `/${fileName + '_' + (width as unknown as string) + '_' + (height as unknown as string)}.jpg`, path.resolve('./') + `/assets/${fileName + '_' + (width as unknown as string) + '_' + (height as unknown as string)}.jpg`);
    //     const newImgLocation = path.resolve('./') + `/assets/${fileName + '_' + (width as unknown as string) + '_' + (height as unknown as string) as string}.jpg`;
    //     // imagesName.push(name+(width as unknown as string)+(height as unknown as string)+'.jpg');
    //     // console.log(imagesName);
    //     // const imagesName = fsPromises.readdir('./assets');
    //     // console.log(fsPromises.readdir('./assets'));
    //     res.sendFile(newImgLocation);
    // });
    // res.sendFile(imgLocation);
    // res.send('ice land waterfall');
}));
exports.default = images;
