const request = require("supertest");
const { app, server } = require("../server");

afterAll((done) => {
  server.close(done);
});

describe("Server Running", () => {
  it("should return hello Express.js", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

describe("GET /words", () => {
  it("should return 10 random words including at least 1 adjective, 1 adverb, 1 noun, and 1 verb", async () => {
    const response = await request(app).get("/words");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ pos: "noun" }),
        expect.objectContaining({ pos: "verb" }),
        expect.objectContaining({ pos: "adverb" }),
        expect.objectContaining({ pos: "adjective" }),
      ])
    );
  });
});

describe("POST /rank", () => {
  it("should calculate and return the rank value", async () => {
    let response = await request(app).post("/rank").send({ score: 60 });

    expect(response.status).toBe(200);
    expect(typeof response.body.rank).toBe("number");
    expect(response.body.rank).toBe(56.67);
  });
});
