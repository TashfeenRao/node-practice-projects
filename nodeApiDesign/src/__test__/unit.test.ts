import * as user from "./../auth/authApis";

describe("the unit test", () => {
  it("should create new user", async () => {
    const req = { body: { username: "hello", password: "hello" } };
    const res = {
      json({ token: token }: any) {
        expect(token).toBeTruthy();
      },
    };
    const newUser = await user.signUp(req, res, () => {});
  });
});
