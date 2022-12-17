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
const resizedMethod_1 = __importDefault(require("../../utilities/resizedMethod"));
const path_1 = __importDefault(require("path"));
describe('Test function resizeImage', () => {
    const imgLocation = path_1.default.resolve('./') + `/assets/icelandwaterfall.jpg`;
    const fileName = `icelandwaterfall`;
    const newFileName = `icelandwaterfall_200_200.jpg`;
    // it('Using resizeImage with invalid imageLocation', async () => {
    //     expect(await resizeImage(`test`,fileName,newFileName,200,200)).toBeFalsy();
    // });
    it('Using resizeImage with invalid fileName or not exit or invalid imageLocation return false', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, resizedMethod_1.default)('test', 'test', newFileName, 200, 200)).toBeFalsy();
    }));
    it('Using resizeImage with invalid newFileName return false', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, resizedMethod_1.default)(imgLocation, fileName, 'test', 200, 200)).toBeFalsy();
    }));
    it('Using resizeImage should have imageLocation, fileName, newFileName, width, height return true', () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield (0, resizedMethod_1.default)(imgLocation, fileName, newFileName, 200, 200)).toBeTruthy();
    }));
});
