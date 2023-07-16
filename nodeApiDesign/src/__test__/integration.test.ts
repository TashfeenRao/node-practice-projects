import request from "supertest";
import app from "../index";

describe("integrations test for /", () => {
  it("it should be hello", async () => {
    const res = await request(app).get("/");
    expect(res.body.message).toEqual("hello");
  });
});
