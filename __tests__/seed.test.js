const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");
beforeEach(() => seed(data));
afterAll(() => db.end());
describe("Seed", () => {
  test("Checks that topics data are inserted correctly", () => {
    return db.query(`SELECT * FROM topics;`).then(({ rows: topics }) => {
      topics.forEach((topic) => {
        expect(topic).toHaveProperty("slug", expect.any(String));
        expect(topic).toHaveProperty("description", expect.any(String));
      });
    });
  });
  test("Checks that users data are inserted correctly", () => {
    return db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
      users.forEach((user) => {
        expect(user).toHaveProperty("username", expect.any(String));
        expect(user).toHaveProperty("name", expect.any(String));
        expect(user).toHaveProperty("avatar_url", expect.any(String));
      });
    });
  });
  test("Checks that articles data are inserted correctly", () => {
    return db.query(`SELECT * FROM articles;`).then(({ rows: articles }) => {
      articles.forEach((article) => {
        expect(article).toHaveProperty("article_id", expect.any(Number));
        expect(article).toHaveProperty("title", expect.any(String));
        expect(article).toHaveProperty("topic", expect.any(String));
        expect(article).toHaveProperty("author", expect.any(String));
        expect(article).toHaveProperty("body", expect.any(String));
        expect(article).toHaveProperty("created_at", expect.any(Date));
        expect(article).toHaveProperty("votes", expect.any(Number));
        expect(article).toHaveProperty("article_img_url", expect.any(String));
      });
    });
  });
  test("Checks that comments data are inserted correctly", () => {
    return db.query(`SELECT * FROM comments;`).then(({ rows: comments }) => {
      comments.forEach((comment) => {
        expect(comment).toHaveProperty("comment_id", expect.any(Number));
        expect(comment).toHaveProperty("body", expect.any(String));
        expect(comment).toHaveProperty("article_id", expect.any(Number));
        expect(comment).toHaveProperty("author", expect.any(String));
        expect(comment).toHaveProperty("votes", expect.any(Number));
        expect(comment).toHaveProperty("created_at", expect.any(Date));
      });
    });
  });
});
