const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("[POST] /register", () => {
  it("responds with a 201 created", async () => {
    const res = await request(server).post("/users");
    expect(res.status).toBe(201);
  });
  it.todo("Test 2");
});

describe("[POST] /login", () => {
  // it("responds with a 201 created", async () => {
  //   const res = await request(server).post("/register");
  //   expect(res.status).toBe(200);
  // });
  it.todo("Test 2");
});

describe("[GET] /jokes", () => {
  // it("responds with a 201 created", async () => {
  //   const res = await request(server).post("/register");
  //   expect(res.status).toBe(200);
  // });
  it.todo("Test 2");
});
