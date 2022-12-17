import express from 'express';
import path from 'path';
import sharp from 'sharp';
import { promises as fsPromises } from 'fs';
import imagesName from '../../utilities/imagesData';
import { existsSync, mkdirSync, readdirSync } from "fs";
import resizeImage from '../../utilities/resizedMethod';

const images = express.Router();




images.get('/', async (req, res) => {
    const fileName = req.query.fileName as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);
    const imgLocation = path.resolve('./') + `/assets/${fileName}.jpg`;
    const image = imagesName.includes(fileName);
    const newFileName = `${fileName + '_' + (width as unknown as string) + '_' + (height as unknown as string)}.jpg`;
    
    

    if (fileName === undefined) {
        return res.status(400).send('Bad request, query parameter (fileName) is required.');
    }

    if (image === false) {
        return res.status(404).send('Resource not found, this image does not exist!');
    }

    if (existsSync(imgLocation) === false) {
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
        if (!existsSync(path.resolve('./') + `/assets/resizedImage`)) {
            mkdirSync(path.resolve('./') + `/assets/resizedImage`);
            if(await resizeImage(imgLocation,fileName,newFileName,width,height)){
                const resizedImagePath = path.resolve('./') + `/assets/resizedImage/`+ newFileName;
                res.sendFile(resizedImagePath);
            }
            else{
                return res.status(400).send('Oops!! Something went wrong!');
            }
            // const resizedImagePath = path.resolve('./') + `/assets/resizedImage/`+ newFileName;
            // res.sendFile(resizedImagePath);
        } else {
            const filesNameList = readdirSync(path.resolve('./') + `/assets/resizedImage`);

            if (filesNameList.includes(newFileName)) {
                // console.log(path.resolve('./') + `/assets/resizedImage/${newFileName}`);
                res.sendFile(path.resolve('./') + `/assets/resizedImage/${newFileName}`);
            }
            else{
                if(await resizeImage(imgLocation,fileName,newFileName,width,height)){
                    const resizedImagePath = path.resolve('./') + `/assets/resizedImage/`+ newFileName;
                    res.sendFile(resizedImagePath);
                }
                else{
                    return res.status(400).send('Oops!! Something went wrong!');
                }
                // await resizeImage(imgLocation,newFileName,width,height);
                // const resizedImagePath = path.resolve('./') + `/assets/resizedImage/`+ newFileName;
                // res.sendFile(resizedImagePath);
            }
        }
    }
    catch (err) {
        console.log(err)
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
});


export default images;