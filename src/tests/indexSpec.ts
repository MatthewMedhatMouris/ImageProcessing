import supertest from 'supertest';
import app from '../index';

const request = supertest(app);


describe('Test endpoint responses', () => {

    it('Using the endpoint without providing the fileName parameter returns 400', async () => {
        const response = await request.get('/api/images?width=200&height=200');
        expect(response.status).toBe(400);
    });

    it('Using the endpoint without providing the width parameter returns 400', async () => {
        const response = await request.get('/api/images?fileName=icelandwaterfall&height=200');
        expect(response.status).toBe(400);
    });

    it('Using the endpoint without providing the height parameter returns 400', async () => {
        const response = await request.get('/api/images?fileName=icelandwaterfall&width=200');
        expect(response.status).toBe(400);
    });


    it('Using the endpoint with a non-existent image returns 404', async () => {
        const response = await request.get('/api/images?fileName=OPPO&width=200&height=200');
        expect(response.status).toBe(404);
    });


    it('gets the api endpoint', async () => {
        const response = await request.get('/api/images?fileName=icelandwaterfall&width=200&height=200');
        expect(response.status).toBe(200);
    }



)});

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


