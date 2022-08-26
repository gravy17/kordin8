import request from "supertest";
import app from "../src/app";
process.env.JWT_SECRET = "secret";

// This is a sample of what tests would look like. Remember to remove the .skip and replace the .todo with tests
describe("Tests User Endpoints", () => {
  it.skip("should return a user", async () => {
    const response = await request(app).get("/api/users/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", 1);
    expect(response.body).toHaveProperty("name", "John Doe");
    expect(response.body).toHaveProperty("email", "john@example.com");
  });

  it.todo("should return a list of users");

  it.todo("should create a new user");

  it.todo("should update a user");

  it.todo("should delete a user");
});
