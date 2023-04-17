import request from "supertest";
import server from "../../index";

afterAll((done) => {
  server.close(done);
});

describe("auth", () => {
  describe("user registration", () => {
    describe("given all is valid", () => {
      test("should return true if all is fine", async () => {
        const response = await request(server).post("/auth/register").send({
          username: "validUser",
          email: "validuser@example.com",
          password: "validPassword",
          confirmPassword: "validPassword",
        });
        expect(response.status).toEqual(201);
      });
    });
    describe("given there is validation fail", () => {
      // TODO:
      // test("should return status code 422 and the errors messages", async () => {});
    });
    describe("verify that user does not already exist", () => {});
    describe("the user object gets returned", () => {});
  });

  describe("user login", () => {
    // ...
    // ...
    // creating a user session (cookie?)
  });

  describe("user logout", () => {});
});

/*
 describe("user login", () => {
    it("should return an authentication token", async () => {
      const response = await request(app).post("/auth/login").send({
        email: userData.email,
        password: userData.password,
      });
      expect(response.status).toEqual(200);
      expect(response.body.token).toBeDefined();
    });
  });

  describe("user profile", () => {
    it("should return the user's profile information", async () => {
      const response = await request(app)
        .get("/auth/profile")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toEqual(200);
      expect(response.body.username).toEqual(userData.username);
      expect(response.body.email).toEqual(userData.email);
    });
  });
*/
