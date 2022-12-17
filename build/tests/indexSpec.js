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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('Using the endpoint without providing the fileName parameter returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?width=200&height=200');
        expect(response.status).toBe(400);
    }));
    it('Using the endpoint without providing the width parameter returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?fileName=icelandwaterfall&height=200');
        expect(response.status).toBe(400);
    }));
    it('Using the endpoint without providing the height parameter returns 400', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?fileName=icelandwaterfall&width=200');
        expect(response.status).toBe(400);
    }));
    it('Using the endpoint with a non-existent image returns 404', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?fileName=OPPO&width=200&height=200');
        expect(response.status).toBe(404);
    }));
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?fileName=icelandwaterfall&width=200&height=200');
        expect(response.status).toBe(200);
    }));
});
// describe('Testing the icelandwaterfall endpoint', () => {
//     it('Using the endpoint without providing the name parameter returns 400', async () => {
//       await request.get('/icelandwaterfall').expect(400);
//     });
// it('Using the endpoint with a non-existent lead returns 404', async () => {
//   await request.get('/leads?name=Ali').expect(404);
// });
// it('Using the endpoint with a valid lead that does not have a photo returns 404', async () => {
//   await request.get('/leads?name=Hasan').expect(404);
// });
// it('Using the endpoint with a valid lead returns 200', async () => {
//   await request.get('/leads?name=Hossam').expect(200);
// });
//   });
