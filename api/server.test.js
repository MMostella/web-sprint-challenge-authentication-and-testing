const server = require("./server");
const request = require("supertest");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

const newUser = {
  username: "test",
  password: "1234",
};

const fakeUser = {
  username: "fake",
  password: "1234",
};

describe("[POST] /register", () => {
  it("responds with a 201 created", async () => {
    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(201);
  });
  it("422 error when try registering same User", async () => {
    const res = await request(server).post("/api/auth/register").send(newUser);
    expect(res.status).toBe(422);
  });
});

describe("[POST] /login", () => {
  it("responds with a 200 created", async () => {
    const res = await request(server).post("/api/auth/login").send(newUser);
    expect(res.status).toBe(200);
  });
  it("401 unauthorized code for someone without correct login creds", async () => {
    const res = await request(server).post("/api/auth/login").send(fakeUser);
    expect(res.status).toBe(401);
  });
});

describe("[GET] /jokes", () => {
  it("responds with a 200 created", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.status).toBe(200);
  });
  it("responds with all (3) jokes", async () => {
    const res = await request(server).get("/api/jokes");
    expect(res.body).toHaveLength(3);
  });
});
