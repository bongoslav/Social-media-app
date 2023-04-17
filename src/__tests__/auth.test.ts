import request from "supertest";
import server from "../../index";
import User from "../models/User";

const validRegisterData = {
  username: "validUser",
  email: "validuser@example.com",
  password: "validPassword",
  confirmPassword: "validPassword",
};

const invalidRegisterData = {
  username: "",
  email: "invalidEmail",
  password: "dsa",
  confirmPassword: "asd",
};

const invalidRegisterDataResponse = [
  {
    value: "",
    msg: "Username is required",
    param: "username",
    location: "body",
  },
  {
    value: "",
    msg: "Username should be at least 6 characters long",
    param: "username",
    location: "body",
  },
  {
    value: "invalidEmail",
    msg: "Invalid email address",
    param: "email",
    location: "body",
  },
  {
    value: "dsa",
    msg: "Password should be at least 6 characters long",
    param: "password",
    location: "body",
  },
  {
    value: "asd",
    msg: "Passwords do not match",
    param: "confirmPassword",
    location: "body",
  },
];

afterAll(async () => {
  await server.close();
  await User.deleteOne({ username: "validUser" });
});

describe("user registration", () => {
  describe("given all is valid", () => {
    test("should return true if all is fine", async () => {
      const response = await request(server)
        .post("/auth/register")
        .send(validRegisterData);
      expect(response.status).toEqual(201);
    });
  });
  describe("given there is validation fail", () => {
    test("should return status code 422 and the errors messages", async () => {
      const response = await request(server)
        .post("/auth/register")
        .send(invalidRegisterData);
      expect(response.status).toEqual(422);
      expect(response.body).toEqual(invalidRegisterDataResponse);
    });
  });
  describe("verify that user does not already exist", () => {
    test("should return status code 400 and the error message", async () => {
      const response = await request(server)
        .post("/auth/register")
        .send(validRegisterData);
      expect(response.status).toEqual(400);
      expect(response.body.error).toEqual("User already exists");
    });
  });
});

describe("user login", () => {
  // ...
  // ...
  // creating a user session (cookie?)
});

describe("user logout", () => {});

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
