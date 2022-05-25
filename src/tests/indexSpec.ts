import app from '../app';
import supertest from 'supertest';

const server = supertest(app);

describe('Test Image Processing Api', () => {
  it('Should get success response with resized image', async () => {
    const res = await server.get('/api/images?name=encenadaport&height=5000&width=5000');

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/jpe?g/);
  });

  it('Should get BadRequest response with array of errors when i send a request to "/api/images" with out and query string', async () => {
    const res = await server.get('/api/images');

    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body).toEqual(['"name" is required', '"width" is required', '"height" is required']);
  });
});
