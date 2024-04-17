const app = require("../app/app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const data = require("../db/data/test-data/index.js");
const endPointsJson = require("../endpoints.json");

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
  describe("/api", () => {
    test("GET 200: Returns api endpoints JSON", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const { endPoints } = body;
          expect(endPoints).toMatchObject(endPointsJson);
        });
    });
  });

  describe("/api/articles/:article_id", () => {
    describe("GET Requests", () => {
      test("GET 200: Accepts a parametric endpoint with and article id and returns that article", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(({ body }) => {
            const { article } = body;
            expect(article).toMatchObject({
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              body: "I find this existence challenging",
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 100,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            });
          });
      });
      test("GET 404: Responds with the appropriate error when passed the wrong article_id", () => {
        return request(app)
          .get("/api/articles/14")
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Not Found");
          });
      });
    });
    describe("PATCH Requests", () => {
      test("PATCH 200: updates an article by article_id and return the updated article", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 10 })
          .expect(200)
          .then(({ body }) => {
            const { article } = body;
            expect(article).toMatchObject({
              author: "butter_bridge",
              title: "Living in the shadow of a great man",
              article_id: 1,
              body: "I find this existence challenging",
              topic: "mitch",
              created_at: "2020-07-09T20:11:00.000Z",
              votes: 110,
              article_img_url:
                "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            });
          });
      });
      test("PATCH 404: Should return an error if the article_id is  a valid datatype but does not exist", () => {
        return request(app)
          .patch("/api/articles/70")
          .send({ inc_votes: 10 })
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Not Found");
          });
      });

      test("PATCH 400: Should return an error if inc_votes is no valid datatype", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "hi" })
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });

  describe("/api/articles", () => {
    test("GET 200: Gets all articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(13);
          articles.forEach((article) => {
            expect(typeof article.author).toBe("string");
            expect(typeof article.title).toBe("string");
            expect(typeof article.article_id).toBe("number");
            expect(typeof article.topic).toBe("string");
            expect(new Date(article.created_at)).toBeInstanceOf(Date);
            expect(typeof article.votes).toBe("number");
            expect(typeof article.article_img_url).toBe("string");
            expect(typeof article.comment_count).toBe("string");
          });
        });
    });
    test("GET 200: The articles should be sorted by date in descending order", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(13);
          expect(articles).toBeSortedBy("created_at", { descending: true });
        });
    });
    test("GET 200: There should not be a body property present on any of the article objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles.length).toBe(13);
          articles.forEach((article) => {
            expect(article).not.toHaveProperty("body");
          });
        });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    describe("GET Requests", () => {
      test("GET 200: Sould return an array of comments for an article_id", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;
            expect(comments.length).toBe(11);
            comments.forEach((comment) => {
              expect(typeof comment.comment_id).toBe("number");
              expect(typeof comment.votes).toBe("number");
              expect(new Date(comment.created_at)).toBeInstanceOf(Date);
              expect(typeof comment.author).toBe("string");
              expect(typeof comment.body).toBe("string");
              expect(typeof comment.article_id).toBe("number");
            });
          });
      });
      test("GET 200: Sould return an array of comments for an article_id with most recent comments first", () => {
        return request(app)
          .get("/api/articles/1/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;
            expect(comments.length).toBe(11);
            expect(comments).toBeSortedBy("created_at", { descending: true });
          });
      });
      test("GET 404: Should return an error if the article_id is a valid datatype but does not exsist", () => {
        return request(app)
          .get("/api/articles/14/comments")
          .expect(404)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Not Found");
          });
      });
      test("GET 400: Should return an error if the article_id is no valid datatype or not included", () => {
        return request(app)
          .get("/api/articles/Invalid-Id/comments")
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Bad Request");
          });
      });
    });
    describe("POST Requests", () => {
      test("POST 201: Should add a comment for an article and returned the added comment", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "Hello New Post",
          })
          .expect(201)
          .then(({ body }) => {
            const { comment } = body;
            comment.created_at = new Date(comment.created_at);
            expect(comment).toMatchObject(
              expect.objectContaining({
                comment_id: 19,
                body: "Hello New Post",
                article_id: 1,
                author: "butter_bridge",
                votes: 0,
              })
            );
            expect(comment).toMatchObject({ created_at: expect.any(Date) });
          });
      });
      test("POST 201: Should add a comment for an article and return the added comment even if the body an empty string", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
            body: "",
          })
          .expect(201)
          .then(({ body }) => {
            const { comment } = body;
            comment.created_at = new Date(comment.created_at);
            expect(comment).toMatchObject(
              expect.objectContaining({
                comment_id: 19,
                body: "",
                article_id: 1,
                author: "butter_bridge",
                votes: 0,
              })
            );
            expect(comment).toMatchObject({ created_at: expect.any(Date) });
          });
      });
      test("POST 422: Should return an error if the article_id is a valid datatype but does not exsist", () => {
        return request(app)
          .post("/api/articles/14/comments")
          .send({
            username: "butter_bridge",
            body: "Hello New Post",
          })
          .expect(422)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Not Found");
          });
      });
      test("POST 400: Should return an error if the article_id is not valid datatype or not included", () => {
        return request(app)
          .post("/api/articles/invalid-id/comments")
          .send({
            username: "butter_bridge",
            body: "Hello New Post",
          })
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Bad Request");
          });
      });
      test("POST 422: Should return an error if the username is a valid data type but does not exist", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "not_a_valid_username",
            body: "Hello New Post",
          })
          .expect(422)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Not Found");
          });
      });
      test("POST 400: Should return an error if the username not included", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            body: "Hello New Post",
          })
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Bad Request");
          });
      });
      test("POST 400: Should return an error if the body is not included", () => {
        return request(app)
          .post("/api/articles/1/comments")
          .send({
            username: "butter_bridge",
          })
          .expect(400)
          .then(({ body }) => {
            const { msg } = body;
            expect(msg).toBe("Bad Request");
          });
      });
    });
  });
  describe("/api/comments/:comment_id", () => {
    test("DELETE 204: deletes the given comment by comment_id", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
    test("DELETE 404: returns the approriate error if the comment_id is the valid data type but does not exist", () => {
      return request(app)
        .delete("/api/comments/100")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Not Found");
        });
    });
    test("DELETE 400: returns the approriate error if the comment_id is not a valid data type", () => {
      return request(app)
        .delete("/api/comments/invalid-id")
        .expect(400)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("Bad Request");
        });
    });
  });
});
