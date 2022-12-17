import path from 'path';
import { existsSync, mkdirSync, readdirSync } from "fs";
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';



const resizeImage = async (imageLocation: string, fileName: string, newFileName: string, width: number, height: number) : Promise<boolean> => await sharp(imageLocation)
.resize({
    width: width,
    height: height,
    fit: 'contain',
    position: 'center'
}).toFile(newFileName).then(() => {
    if(newFileName.includes(fileName)){
        fsPromises.rename(path.resolve('./') + `/${newFileName}`, path.resolve('./') + `/assets/resizedImage/${newFileName}`);
        return true;
    }
    else{
        return false;
    }
    
}).catch((err) => {
    return false;
})





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

export default resizeImage;