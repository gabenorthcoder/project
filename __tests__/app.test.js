const app = require("../app/app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");

beforeEach(() => seed(data));
afterAll(() => db.end());
describe("API's", () => {
  describe("/api/healthcheck", () => {
    test("GET 200: returns a status code of 200", () => {
      return request(app).get("/api/healthcheck").expect(200);
    });
  });
  describe("Invalid endpoint", () => {
    test("GET 404: returns a status code of 404 for invalid endpoint", () => {
      return request(app)
        .get("/api/invalid-end-point")
        .expect(404)
        .then(({ body }) => {
          const { msg } = body;
          expect(msg).toBe("Not Found");
        });
    });
  });
  describe("/api/topics", () => {
    test("GET 200: Returns status code 200 for /api/topics endpoint", () => {
      return request(app).get("/api/topics").expect(200);
    });
    test("GET 200: Should return an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(topics.length).toBe(3);
          topics.forEach((topic) => {
            expect(typeof topic.slug).toBe("string");
            expect(typeof topic.description).toBe("string");
          });
        });
    });
  });
});
