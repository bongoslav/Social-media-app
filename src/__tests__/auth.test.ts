import request from "supertest";
import server from "../../index";
import User from "../models/User";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

interface ErrorResponse {
  value: string;
  msg: string;
  param: string;
  location: string;
}

const validRegisterData: RegisterData = {
  username: "validUser",
  email: "validuser@example.com",
  password: "validPassword",
  confirmPassword: "validPassword",
};

const invalidRegisterData: RegisterData = {
  username: "",
  email: "invalidEmail",
  password: "dsa",
  confirmPassword: "asd",
};

const invalidRegisterDataResponse: ErrorResponse[] = [
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

const validLoginData: LoginData = {
  email: "validuser@example.com",
  password: "validPassword",
};

const invalidLoginData: LoginData = {
  email: "invalidEmail",
  password: "dsa",
};

const invalidLoginDataResponse: ErrorResponse[] = [
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
];

const nonExistingUserData: LoginData = {
  email: "someEmail@email.com",
  password: "aValidPassword",
};

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
  describe("given all is valid", () => {
    test("should return user as a json, status 200 and the cookie", async () => {
      const response = await request(server)
        .post("/auth/login")
        .send(validLoginData);
      const user = await User.findOne({ email: validLoginData.email });
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject({
        _id: user._id.toString(),
        email: user.email,
      });

      const cookie = response.headers["set-cookie"][0];
      expect(cookie).toMatch(/^myApp_token=.+/);
    });
  });

  describe("given there is validation fail", () => {
    test("should return status code 422 and the errors messages", async () => {
      const response = await request(server)
        .post("/auth/login")
        .send(invalidLoginData);
      expect(response.status).toEqual(422);
      expect(response.body).toEqual(invalidLoginDataResponse);
    });
  });

  describe("given user does not exist", () => {
    test("should return status code 400 and the error message", async () => {
      const response = await request(server)
        .post("/auth/login")
        .send(nonExistingUserData);
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({ error: "No such user exists" });
    });
  });

  describe("given password is incorrect", () => {
    test("should return status code 401 and the error message", async () => {
      const response = await request(server)
        .post("/auth/login")
        .send({ ...validLoginData, password: "somePassword" });
      expect(response.status).toEqual(401);
      expect(response.body).toEqual({ error: "Incorrect password" });
    });
  });
});

describe("user logout", () => {
  let cookie: string;

  beforeEach(async () => {
    // Log in a user to obtain a valid cookie
    const loginResponse = await request(server)
      .post("/auth/login")
      .send(validLoginData);
    cookie = loginResponse.headers["set-cookie"][0];
  });

  describe("if not errors", () => {
    test("should return status code 200 and clear the cookie", async () => {
      const response = await request(server)
        .post("/auth/logout")
        .set("Cookie", cookie);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({ msg: "Logged out successfully" });
    });

    describe("user is not logged in", () => {
      test("should return status code 401", async () => {
        const response = await request(server).post("/auth/logout");
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({
          msg: "No token, authorization denied",
        });
      });
    });
  });
});
